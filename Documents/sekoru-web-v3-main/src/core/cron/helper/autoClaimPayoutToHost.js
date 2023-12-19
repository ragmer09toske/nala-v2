var CronJob = require('cron').CronJob;
const AllowedLimit = require('async-sema').RateLimit(10);

import { convert } from '../../../helpers/currencyConvertion';
import { paypalclaimPayout } from '../../payment/payout/ClaimPayoutRoutes';
import { stripeClaimPayout } from '../../payment/stripe/stripeClaimpayout';

import {
  Reservation,
  Payout,
  FailedTransactionHistory,
  User,
  Currencies,
  CurrencyRates,
} from '../../../data/models';

import sequelize from '../../../data/sequelize';


const autoClaimPayoutToHost = app => {

  new CronJob('0 0 0 * * *', async function () { // Run every day on 12.00 AM

    console.log("/********************************************/");
    console.log("HOLY MOLY AUTO CLAIM PAYOUT TO HOST CRON STARTED");

    let offset = 0;

    autoClaimPayout(offset);

    async function autoClaimPayout(offset) {
      try {

        const getReservation = await Reservation.findAll({
          limit: 1000,
          attributes: [
            'id',
            'claimPayout',
            'claimRequestDate',
            'currency',
            'hostId',
            'reservationState',
            'claimPaymentAttempt',
            'paymentState',
            'isClaimPaidOut',
            'claimStatus',
            'isHold',
            [sequelize.literal('TIMESTAMPDIFF(HOUR, claimRequestDate, NOW())'), 'day_difference']
          ],
          offset,
          having: {
            'day_difference': {
              $lt: 24
            },
            $or: [{
              reservationState: 'completed'
            },
            {
              reservationState: 'cancelled'
            }
            ],
            paymentState: 'completed',
            claimStatus: 'approved',
            isClaimPaidOut: false,
            isHold: false,
            claimPaymentAttempt: {
              $lt: 3
            },
          },
          order: [
            ['id', 'DESC']
          ],
          raw: true
        });

        var ratesData = {};

        const data = await CurrencyRates.findAll();
        const base = await Currencies.findOne({
          where: {
            isBaseCurrency: true
          }
        });

        if (data) {
          data.map((item) => {
            ratesData[item.dataValues.currencyCode] = item.dataValues.rate;
          })
        };

        if (getReservation && getReservation.length > 0) {
          await Promise.all(getReservation.map(async (item, index) => {

            await AllowedLimit();
            let status = 200, errorMessage, amount, payoutId, convertAmount, checkFailedTransaction, paymentStatus;

            let checkUserStatus = await User.findOne({
              attributes: ['id', 'email'],
              where: {
                id: item.hostId,
                userBanStatus: false,
                userDeletedAt: null
              },
              raw: true
            });

            let getPayout = await Payout.findOne({
              attributes: ['id', 'methodId', 'payEmail'],
              where: {
                userId: item.hostId,
                default: true
              },
              raw: true
            });
            payoutId = getPayout && getPayout.id;

            convertAmount = convert(base.symbol, ratesData, item.claimPayout, item.currency, base.symbol);
            amount = convertAmount.toFixed(2);

            if (getPayout && getPayout.payEmail && checkUserStatus && amount > 0) {

              if (getPayout.methodId === 1) {
                paymentStatus = await paypalclaimPayout(item.id, checkUserStatus.email, amount, base.symbol, payoutId, item.hostId, item.claimPaymentAttempt)
                status = paymentStatus['status']
                errorMessage = paymentStatus['errorMessage']

              } else if (getPayout.methodId === 2) {

                paymentStatus = await stripeClaimPayout(item.id, getPayout.payEmail, amount, base.symbol, checkUserStatus.email, payoutId, item.hostId, item.claimPaymentAttempt)
                status = paymentStatus['status']
                errorMessage = paymentStatus['errorMessage']
              }

              if (status == 400) {
                let updateFailed;
                checkFailedTransaction = await FailedTransactionHistory.findOne({
                  where: {
                    reservationId: item.id,
                    payoutType: 'claimPayout'
                  },
                  raw: true
                });

                if (!checkFailedTransaction) {
                  updateFailed = await FailedTransactionHistory.create({
                    reservationId: item.id,
                    userId: item.hostId,
                    amount,
                    currency: item.currency,
                    reason: JSON.stringify(errorMessage),
                    paymentMethodId: getPayout.methodId,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    payoutType: 'claimPayout'
                  });

                } else {
                  updateFailed = await FailedTransactionHistory.update({
                    userId: item.hostId,
                    amount,
                    currency: item.currency,
                    reason: JSON.stringify(errorMessage),
                    paymentMethodId: getPayout.methodId,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    payoutType: 'claimPayout'
                  }, {
                    where: {
                      reservationId: item.id
                    }
                  });
                }
              } else if(status == 200) {
                await Reservation.update({ isClaimPaidOut: true }, { where: { id: item.id } });
              }
            }
          }));
        }
      } catch (error) {
        console.log(error);
      }
    }
  }, null, true, 'America/Los_Angeles');
}

export default autoClaimPayoutToHost;