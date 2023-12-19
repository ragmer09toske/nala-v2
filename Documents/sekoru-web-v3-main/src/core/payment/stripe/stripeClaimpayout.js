import stripePackage from 'stripe';
import { payment } from '../../../config';
const stripe = stripePackage(payment.stripe.secretKey);

import { TransactionHistory, Reservation } from '../../../data/models';
import { isZeroDecimalCurrency } from '../../../helpers/zeroDecimalCurrency';

export async function stripeClaimPayout(reservationId, destination, amount, currency, hostEmail, payoutId, hostId, claimPaymentAttempt) {
    
    try {

        if (claimPaymentAttempt >= 0)  await Reservation.update({claimPaymentAttempt: claimPaymentAttempt + 1 }, {
                where: {
                    id: reservationId
                }
            });
          
        let claimPayout = await stripe.transfers.create({
            amount: isZeroDecimalCurrency(currency) ? Math.round(amount) : Math.round(amount * 100),
            currency,
            destination,
            transfer_group: 'Claim damage payment to Host',
            metadata: {
                reservationId,
                type: 'payout',
                hostEmail
            }
        });

        if (claimPayout && claimPayout.id) {

            await TransactionHistory.create({
                reservationId,
                userId: hostId,
                payoutId,
                payoutEmail: hostEmail,
                amount,
                currency,
                transactionId: claimPayout.id,
                paymentMethodId: 2,
                payoutType: 'claimPayout'
            });

            return {
                status: 200,
                errorMessage: null
            }
        }

    } catch (error) {
        return {
            status: 400,
            errorMessage: error.message
        }
    }
}