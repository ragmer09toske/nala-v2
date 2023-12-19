import {
    GraphQLInt as IntType,
    GraphQLString as StringType,
    GraphQLFloat as FloatType,
    GraphQLNonNull as NonNull,
} from 'graphql';

import { Reservation, TransactionHistory } from '../../models';
import ReservationType from '../../types/ReservationType';
import { stripeClaimPayout } from '../../../core/payment/stripe/stripeClaimpayout';
import { paypalclaimPayout } from '../../../core/payment/payout/ClaimPayoutRoutes';

const UpdateClaimPayout = {

    type: ReservationType,

    args: {
        reservationId: { type: NonNull(IntType) },
        claimPayout: { type: NonNull(FloatType) },
        receiverEmail: { type: NonNull(StringType) },
        payoutId: { type: NonNull(IntType) },
        hostId: { type: NonNull(StringType) },
        paymentCurrency: { type: NonNull(StringType) },
        paymentMethodId: { type: NonNull(IntType) },
        hostEmail: { type: NonNull(StringType) },
    },

    async resolve({ request, response }, { reservationId, claimPayout, hostId, payoutId, paymentCurrency, paymentMethodId, receiverEmail, hostEmail }) {

        try {

            let status = 200, errorMessage;

            if (!request.user || !request.user.admin) return { status: 500, errorMessage: 'Please login with your account' };
            const reservation = await Reservation.findOne({
                where: {
                    id: reservationId,
                    claimStatus: { $in: ['approved'] },
                    $or: [{ reservationState: 'completed' }, { reservationState: 'cancelled' }],
                    paymentState: 'completed',
                    hostId
                },
                raw: true
            });

            const transaction = await TransactionHistory.findOne({
                where: {
                    id: reservationId,
                    payoutType: 'claimPayout'
                },
                raw: true
            })

            if (!reservation || transaction) {
                status = 400
                errorMessage = 'Something went wrong. Please try again'
            }
            if (reservation && (reservation.claimPayout <= 0 || reservation.isClaimPaidOut)) {
                status = 400
                errorMessage = 'Invalid request'
            }

            if (status == 200) {
                if (paymentMethodId == 1) {
                    await paypalclaimPayout(reservationId, receiverEmail, claimPayout, paymentCurrency, payoutId, hostId)
                        .then(res => {
                            status = res.status;
                            errorMessage = res.errorMessage ? res.errorMessage : null;
                        })
                } else if (paymentMethodId == 2) {
                    await stripeClaimPayout(reservationId, receiverEmail, claimPayout, paymentCurrency, hostEmail, payoutId, hostId)
                        .then(res => {
                            status = res.status;
                            errorMessage = res.errorMessage ? res.errorMessage : null;
                        })
                }
                 if (status === 200) await Reservation.update({ isClaimPaidOut: true }, { where: { id: reservationId } });
            }

            return {
                status,
                errorMessage
            }

        } catch (error) {
            return {
                status: 400,
                errorMessage: 'Something went wrong' + error
            }
        }


    }

}

export default UpdateClaimPayout;