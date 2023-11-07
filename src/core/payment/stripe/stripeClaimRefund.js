import stripePackage from 'stripe';
import { payment } from '../../../config';
import { createTransaction } from './helpers/createTransaction';
import { isZeroDecimalCurrency } from '../../../helpers/zeroDecimalCurrency';

const stripe = stripePackage(payment.stripe.secretKey);

export default async function stripeClaimRefund(reservation, transactionId, amount) {
    try {
        let refundType = (transactionId && transactionId.indexOf("ch_") >= 0) ? 'charge' : 'payment_intent';

        let refundData, status = 200, errorMessage;
        try {
            refundData = await stripe.refunds.create({
                [refundType]: transactionId,
                amount: isZeroDecimalCurrency(reservation.currency) ?  Math.round(amount) :  Math.round(amount * 100),
            });
        } catch (error) {
            status = 400;
            errorMessage = error.message;
        }

        if (status === 200 && refundData && 'id' in refundData) {
            await createTransaction(
                reservation.id,
                null,
                null,
                refundData.id,
                amount,
                reservation.currency,
                'claimRefund',
                2
            );
        }

        return { status: 200, refundData, errorMessage };

    } catch (error) {
        return { status: 400, errorMessage: error.message };
    }


}