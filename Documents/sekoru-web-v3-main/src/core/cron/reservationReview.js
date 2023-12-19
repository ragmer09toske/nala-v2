var CronJob = require('cron').CronJob;
import sequelize from '../../data/sequelize';
import { Reservation, ThreadItems } from '../../data/models';
import { emailBroadcast } from './completedEmail';

const reservationReview = app => {

	new CronJob('0 0 0 * * *', async function () {
		console.log('holy moly completed reservation');
		// get all reservation id
		const getReservationIds = await Reservation.findAll({
			attributes: [ 
				'id',
				'reservationState',
				'hostId',
				'checkIn',
				'checkOut',
				'startTime',
				'endTime',
				'paymentState',
				[sequelize.literal('TIMESTAMPDIFF(DAY, checkOut, NOW())'), 'day_difference']
			],
			having: {
				'day_difference': {
					$eq: 1
				},
				reservationState: 'completed',
				paymentState: 'completed'
			}
		});

		// Update Reservation Status to completed
		if (getReservationIds != null && getReservationIds.length > 0) {
			getReservationIds.map(async (item) => {
				// Get ThreadId
				let getThreadId = await ThreadItems.findOne({
					where: {
						reservationId: item.id
					}
				});

				await emailBroadcast(item.id);
			})
		}

	}, null, true, 'America/Los_Angeles');

};

export default reservationReview;