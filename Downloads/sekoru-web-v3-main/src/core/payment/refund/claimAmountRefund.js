import paypal from 'paypal-rest-sdk';
import { createTransaction } from './createTransaction';
import { getConfigurationData } from '../../getConfigurationData';

export async function paypalClaimRefund(reservation, transactionData, amount) {

    try {
        let sync_mode = 'false';
        // paypal payment configuration.
        let configData = await getConfigurationData({ name: ['paypalEmail', 'paypalClientId', 'paypalSecret', 'paypalHostMode', 'paypalHost'] });
        
        const refundData = await new Promise((resolve, reject) => {

            var paymentConfig = {
                "api": {
                    "host": configData.paypalHost,
                    "mode": configData.paypalHostMode,
                    "port": '',
                    "client_id": configData.paypalClientId,  // your paypal application client id
                    "client_secret": configData.paypalSecret // your paypal application secret id
                }
            }
    
            paypal.configure(paymentConfig.api);

            var sender_batch_id = Math.random().toString(36).substring(9);
            var receiverEmail = transactionData.payerEmail;

            var create_payout_json = {
                "sender_batch_header": {
                    "sender_batch_id": sender_batch_id,
                    "email_subject": "Your security deposit amount has been refunded"
                },
                "items": [
                    {
                        "recipient_type": "EMAIL",
                        "amount": {
                            "value": amount,
                            "currency": reservation.currency
                        },
                        "receiver": receiverEmail,
                        "note": "Thank you.",
                        "sender_item_id": reservation.id
                    }
                ]
            };


            paypal.payout.create(create_payout_json, sync_mode, async function (error, payout) {
                if (error) {
                    reject(error.response);
                } else {
                    let batchStatus = payout.batch_header.batch_status, fees = 0, transactionId;
                    let payerEmail, receiverEmail, payerId, receiverId;

                    fees = payout.batch_header.fees.value;
                    transactionId = payout.items[0].transaction_id;
                    payerEmail = transactionData.receiverEmail;
                    payerId = transactionData.receiverId;
                    receiverId = transactionData.payerId;
                    receiverEmail = transactionData.payerEmail;

                    if (batchStatus && batchStatus === 'SUCCESS') {
                        await createTransaction(
                            reservation.id,
                            receiverEmail,
                            receiverId,
                            payerId,
                            payerEmail,
                            transactionId,
                            amount,
                            fees,
                            reservation.currency,
                            "claimRefund"
                        );
                        resolve(batchStatus)
                    }
                    else reject({ status: batchStatus });

                }
            });

        });

        if (refundData && refundData === 'SUCCESS') return { status: 200 };
        else return { status: 400 };

    } catch (error) {
        return { status: 400, errorMessage: error.message };
    }

}

