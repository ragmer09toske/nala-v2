import paypal from 'paypal-rest-sdk';
import { getConfigurationData } from '../../getConfigurationData';
import {createTransaction} from './createTransaction';

const refundRoutes = app => {

  app.post('/refund', async function(req, res) {

    let configData = await getConfigurationData({ name: ['paypalEmail', 'paypalClientId', 'paypalSecret', 'paypalHostMode', 'paypalHost'] });
    // paypal payment configuration.
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
    var reservationId = req.body.reservationId;
    var receiverEmail = req.body.receiverEmail;
    var receiverId = req.body.receiverId;
    var payerEmail = req.body.payerEmail;
    var payerId = req.body.payerId;
    var amount = req.body.amount;
    var currency = req.body.currency;    

    var create_payout_json = {
        "sender_batch_header": {
            "sender_batch_id": sender_batch_id,
            "email_subject": "You have a payment"
        },
        "items": [
            {
                "recipient_type": "EMAIL",
                "amount": {
                    "value": amount,
                    "currency": currency
                },
                "receiver": receiverEmail,
                "note": "Thank you.",
                "sender_item_id": reservationId
            }
        ]
    };

    var sync_mode = 'false';

    paypal.payout.create(create_payout_json, sync_mode, async function (error, payout) {
      if (error) {
          res.send({status: error.response});
          throw error;
      } else {
          var batchId = payout.batch_header.payout_batch_id;
          var batchStatus = payout.batch_header.batch_status;
          var fees = payout.batch_header.fees.value;
          var transactionId = payout.items[0].transaction_id;         
          /*paypal.payout.get(payoutId, function (error, payoutData) {
              if (error) {
                  console.log(error);
                  throw error;
              } else {
                  console.log("Get Payout Response");
                  console.log(JSON.stringify(payoutData));
              }
          });*/ 
          if(batchStatus && batchStatus === 'SUCCESS'){
            await createTransaction(
              reservationId,
              receiverEmail,
              receiverId,
              payerId,
              payerEmail,
              transactionId,
              amount,
              fees,
              currency
            );
            res.send({status: batchStatus});
          } else {
            res.send({status: batchStatus});
          }
      }
    }); 

  });

};

export default refundRoutes;