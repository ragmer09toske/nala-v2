import {
    GraphQLInt as IntType,
    GraphQLFloat as FloatType,
    GraphQLNonNull as NonNull
} from 'graphql';
import { Reservation, ThreadItems, Transaction, Threads } from '../../models';
import ReservationType from '../../types/ReservationType';
import { paypalClaimRefund } from '../../../core/payment/refund/claimAmountRefund';
import stripeClaimRefund from '../../../core/payment/stripe/stripeClaimRefund';

const updateClaimRefund = {
    type: ReservationType,
    args: {
        reservationId: { type: new NonNull(IntType) },
        claimRefund: { type: new NonNull(FloatType) }
    },
    async resolve({ request }, { reservationId, claimRefund }) {
        try {
            if (!request.user || !request.user.admin) return { status: 500, errorMessage: 'Please login with your account' };
            const reservation = await Reservation.findOne({ attributes: ['id', 'currency', 'paymentMethodId', 'securityDeposit'], where: { id: reservationId, claimStatus: { $in: ['pending', 'requested'] } }, raw: true });
            if (!reservation) return { status: 400, errorMessage: 'something went wrong' };

            let claimPayout = reservation.securityDeposit - claimRefund;
            let claimStatus = reservation.securityDeposit === claimRefund ? 'fullyRefunded' : 'approved';

            if (claimRefund > 0) {
                let stripePaymentMethodIds = [2, 3, 4];

                const transactionData = await Transaction.findOne({ attributes: ['payerEmail', 'transactionId', 'receiverEmail', 'payerId', 'receiverId'], where: { reservationId, paymentType: 'booking' }, raw: true });
                if (!transactionData) return { status: 400, errorMessage: 'something went wrong' };

                if (stripePaymentMethodIds.includes(reservation.paymentMethodId)) {

                    const stripeData = await stripeClaimRefund(reservation, transactionData.transactionId, claimRefund);

                    if (!stripeData || (stripeData && (!stripeData.refundData || !stripeData.refundData.id))) return { status: 400 };

                    if (stripeData && stripeData.status != 200) return stripeData;

                } else if (reservation.paymentMethodId == 1) {

                    const paypalData = await paypalClaimRefund(reservation, transactionData, claimRefund);

                    if (!paypalData) return { status: 400 };

                    if (paypalData && paypalData.status != 200) return paypalData;
                }
            }

            await Reservation.update({ claimRefund, claimPayout, claimStatus, isClaimRefunded: true }, { where: { id: reservationId } });
            const threadItem = await ThreadItems.findOne({ where: { reservationId }, raw: true });

            if (threadItem) {
                await ThreadItems.create({
                    reservationId,
                    threadId: threadItem.threadId,
                    sentBy: threadItem.sentBy,
                    type: 'claimRefunded',
                    startDate: threadItem.startDate,
                    endDate: threadItem.endDate,
                    startTime: threadItem.startTime,
                    endTime: threadItem.endTime,
                    personCapacity: threadItem.personCapacity
                });
                await Threads.update({
                    isRead: false,
                    messageUpdatedDate: new Date()
                },
                    {
                        where: {
                            id: threadItem.threadId
                        }
                    }
                );
            }
            return { status: 200 };
        } catch (error) {
            return { status: 400, errorMessage: error.message };
        }
    }
}

export default updateClaimRefund;