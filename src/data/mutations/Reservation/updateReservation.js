// GrpahQL
import {
  GraphQLList as List,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLNonNull as NonNull,
} from 'graphql';

import ReservationType from '../../types/ReservationType';

// Sequelize models
import { Reservation, ListBlockedDates, Threads, UserProfile } from '../../models';
import { sendNotifications } from '../../../helpers/sendNotifications';

const updateReservation = {

  type: ReservationType,

  args: {
    reservationId: { type: new NonNull(IntType) },
    actionType: { type: new NonNull(StringType) },
    threadId: { type: IntType }
  },

  async resolve({ request, response }, { reservationId, actionType, threadId }) {
    let isReservationUpdated = false;
    // Check if user already logged in
    if (request.user && !request.user.admin) {

      const userId = request.user.id;
      let notifyUserId, notifyUserType, notifyContent;
      let userName, messageContent;
      
      const updateReservation = await Reservation.update({
        reservationState: actionType
      }, {
          where: {
            id: reservationId
          }
        }).then(function (instance) {
          // Check if any rows are affected
          if (instance > 0) {
            isReservationUpdated = true;
          }
        });

      const getThread = await Threads.findOne({
        where: {
          id: threadId
        },
        raw: true
      });

      if (getThread && getThread.host && getThread.guest) {
        notifyUserId = getThread.host === userId ? getThread.guest : getThread.host;
        notifyUserType = getThread.host === userId ? 'renter' : 'owner';
      }

      const hostProfile = await UserProfile.findOne({
        where: {
          userId: getThread.host
        }
      });

      if (hostProfile && getThread) {
        userName = hostProfile && hostProfile.displayName ? hostProfile.displayName : hostProfile.firstName
      }

      if (actionType == 'approved') {
        messageContent = userName + ': ' + 'Booking is approved';

        notifyContent = {
          "screenType": "trips",
          "title": "Approved",
          "userType": notifyUserType.toString(),
          "message": messageContent.toString(),
        };
      } else {
        messageContent = userName + ' : ' + 'Booking is Declined';

        notifyContent = {
          "screenType": "trips",
          "title": "Declined",
          "userType": notifyUserType.toString(),
          "message": messageContent.toString(),
        };
      }

      if (actionType === 'declined') {

        // const unlockBlockedDates = await ListBlockedDates.update({
        //   reservationId: null,
        //   calendarStatus: 'available'
        // }, {
        //     where: {
        //       reservationId,
        //     }
        //   });

        const unlockBlockedDates = await ListBlockedDates.update({
          reservationId: null,
          calendarStatus: 'available'
        }, {
            where: {
              reservationId,
              calendarStatus: 'blocked',
              isSpecialPrice: {
                $ne: null
              }
            }
          });

          const unblockDatesWithOutPrice = await ListBlockedDates.destroy({
              where: {
                reservationId,
                calendarStatus: 'blocked',
                isSpecialPrice: {
                  $eq: null
                }
              }
            });

      }

      if (isReservationUpdated) {
        sendNotifications(notifyContent, notifyUserId);

        return {
          status: '200'
        }
      } else {
        return {
          status: '400'
        }
      }

    } else {
      return {
        status: "notLoggedIn",
      };
    }
  },
};

export default updateReservation;

/**
mutation updateReservation(
  $reservationId: Int!,
  $actionType: String!
){
    updateReservation(
      reservationId: $reservationId,
      actionType: $actionType
    ) {
        status
    }
}
**/
