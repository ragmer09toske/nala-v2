var CronJob = require('cron').CronJob;
const AllowedLimit = require('async-sema').RateLimit(10);

import sequelize from '../../data/sequelize';
import { Reservation, ListBlockedDates, ThreadItems, Threads } from '../../data/models';
import fetch from '../fetch';
import { emailBroadcast } from './expiredEmail';

const reservationExpire = app => {

	new CronJob('0 0 0 * * *', async function () {
		console.log('holy moly expire reservation');

		const getTodayReservations = await sequelize.query(`SELECT id, reservationState, checkIn, checkOut, guests, paymentState, createdAt,  DATE_FORMAT(checkIn,'%Y%m%d') AS formatCheckout, DATE_FORMAT(NOW(),'%Y%m%d') as today , TIMESTAMPDIFF(HOUR, createdAt, NOW()) as hours_difference FROM Reservation having (formatCheckout <= today OR hours_difference > 24) AND reservationState = 'pending';
		`,
			{ type: sequelize.QueryTypes.SELECT }
		);

		// Store them in an array
		if (getTodayReservations != null && getTodayReservations.length > 0) {
			getTodayReservations.map(async (item) => {

				await AllowedLimit();

				// Update Reservation Status
				const updateReservation = await Reservation.update({
					reservationState: 'expired'
				}, {
					where: {
						id: item.id
					}
				});

				const getThreadId = await ThreadItems.findOne({
					attributes: ['threadId', 'reservationId'],
					where: {
						reservationId: item.id
					}
				});

				// Update ThreadItems
				const updateThreadItems = await ThreadItems.update({
					type: 'expired'
				}, {
					where: {
						reservationId: item.id
					}
				});

				if (getThreadId) {
					await Threads.update({
						isRead: false,
						messageUpdatedDate: new Date()
					}, {
						where: {
							id: getThreadId.threadId
						}
					});
				}

				// Unblock blocked dates
				const unblockDates = await ListBlockedDates.destroy({
					where: {
						reservationId: item.id
					}
				});

				await emailBroadcast(item.id);
			})
		}

	}, null, true, 'America/Los_Angeles');

};

export default reservationExpire;