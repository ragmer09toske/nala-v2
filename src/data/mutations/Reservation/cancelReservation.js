// GrpahQL
import {
  GraphQLList as List,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLFloat as FloatType,
  GraphQLNonNull as NonNull,
} from 'graphql';

import ReservationType from '../../types/ReservationType';

// Sequelize models
import { Reservation, ListBlockedDates, CancellationDetails, ThreadItems, Threads, UserProfile } from '../../models';
import { sendNotifications } from '../../../helpers/sendNotifications';

import moment from 'moment';

const cancelReservation = {

  type: ReservationType,

  args: {
    reservationId: { type: new NonNull(IntType) },
    cancellationPolicy: { type: new NonNull(StringType) },
    refundToGuest: { type: new NonNull(FloatType) },
    payoutToHost: { type: new NonNull(FloatType) },
    guestServiceFee: { type: new NonNull(FloatType) },
    hostServiceFee: { type: new NonNull(FloatType) },
    total: { type: new NonNull(FloatType) },
    currency: { type: new NonNull(StringType) },
    threadId: { type: new NonNull(IntType) },
    cancelledBy: { type: new NonNull(StringType) },
    message: { type: new NonNull(StringType) },
    checkIn: { type: new NonNull(StringType) },
    checkOut: { type: new NonNull(StringType) },
    guests: { type: new NonNull(IntType) },
    startTime: { type: new NonNull(FloatType) },
    endTime: { type: new NonNull(FloatType)}
  },

  async resolve({ request, response }, {
    reservationId,
    cancellationPolicy,
    refundToGuest,
    payoutToHost,
    guestServiceFee,
    hostServiceFee,
    total,
    currency,
    threadId,
    userId,
    cancelledBy,
    message,
    checkIn,
    checkOut,
    guests,
    startTime,
    endTime
  }) {
    let isReservationUpdated = false;
    // Check if user already logged in
    if (request.user && !request.user.admin) {

      const userId = request.user.id;

      let notifyUserId, notifyUserType, notifyContent;
      let userName, messageContent, today, startInDate, endInDate, isClaimCancelStatus = false;

      today = moment().format('YYYY-MM-DD');
      startInDate = moment(checkIn).format('YYYY-MM-DD');
      endInDate = moment(checkOut).format('YYYY-MM-DD');
      isClaimCancelStatus = moment(today).isBetween(startInDate, endInDate, undefined, '[]')

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

      const guestProfile = await UserProfile.findOne({
        where: {
          userId: getThread.guest
        }
      });


      if (hostProfile && guestProfile && getThread) {
        userName = getThread.host === userId ? (hostProfile && hostProfile.displayName) : (guestProfile && guestProfile.displayName);
      }


      const count = await Reservation.count({
        where: {
          id: reservationId,
          reservationState: 'cancelled'
        }
      });

      if (count > 0) {
        return {
          status: '400'
        };
      }

      // Update Reservation table
      await Reservation.update({
        reservationState: 'cancelled',
        isClaimCancelStatus
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

      // Unblock the blocked dates only if guest cancels the reservation
      if (cancelledBy === 'renter') {

        // const unlockBlockedDates = await ListBlockedDates.update({
        //   reservationId: null,
        //   calendarStatus: 'available'
        // }, {
        //     where: {
        //       reservationId,
        //     }
        //   });

        await ListBlockedDates.update({
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

        await ListBlockedDates.destroy({
          where: {
            reservationId,
            calendarStatus: 'blocked',
            isSpecialPrice: {
              $eq: null
            }
          }
        });

      }

      // Create record for cancellation details
      await CancellationDetails.create({
        reservationId,
        cancellationPolicy,
        refundToGuest,
        payoutToHost,
        guestServiceFee,
        hostServiceFee,
        total,
        currency,
        cancelledBy: cancelledBy === 'owner' ? 'host' : 'guest'
      });

      // Create thread items
      await ThreadItems.create({
        threadId,
        reservationId,
        sentBy: userId,
        content: message,
        type: cancelledBy === 'owner' ? 'cancelledByHost' : 'cancelledByGuest',
        startDate: checkIn,
        endDate: checkOut,
        personCapacity: guests,
        startTime,
        endTime
      });

      await Threads.update({
        isRead: false,
        messageUpdatedDate: new Date()
      },
        {
          where: {
            id: threadId
          }
        }
      );

      messageContent = userName + ': ' + message;

      notifyContent = {
        "screenType": "trips",
        "title": 'Booking is Cancelled',
        "userType": notifyUserType.toString(),
        "message": messageContent.toString()
      };

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

export default cancelReservation;

/**
mutation cancelReservation(
  $reservationId: Int!,
  $cancellationPolicy: String!,
  $refundToGuest: Float!,
  $payoutToHost: Float!,
  $guestServiceFee: Float!,
  $hostServiceFee: Float!,
  $total: FloatType!,
  $currency: String!,
  $threadId: Int!,
  $cancelledBy: String!,
  $message: String!
){
    cancelReservation(
      reservationId: $reservationId,
      cancellationPolicy: $cancellationPolicy,
      refundToGuest: $refundToGuest,
      payoutToHost: $payoutToHost,
      guestServiceFee: $guestServiceFee,
      hostServiceFee: $hostServiceFee,
      total: $total,
      currency: $currency,
      threadId: $threadId,
      cancelledBy: $cancelledBy,
      message: $message
    ) {
        status
    }
}
**/
