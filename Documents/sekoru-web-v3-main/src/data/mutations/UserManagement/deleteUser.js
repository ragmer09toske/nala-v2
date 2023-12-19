import DeleteUserType from '../../types/siteadmin/DeleteUserType';
import { User, UserLogin, UserClaim, Listing, UserProfile, Threads, Reviews, Reservation, ThreadItems } from '../../models';

import {
  GraphQLList as List,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLNonNull as NonNull,
} from 'graphql';

const deleteUser = {

  type: DeleteUserType,

  args: {
    userId: { type: new NonNull(StringType) },
  },

  async resolve({ request }, { userId }) {

    if (request.user && request.user.admin == true) {

      const findActiveReservation = await Reservation.count({
        where: {
          paymentState: 'completed',
          reservationState: {
            $in: ['pending', 'approved']
          },
          $or: [{
            hostId: userId,
          }, {
            guestId: userId
          }]
        }
      });

      if (findActiveReservation > 0) {
        return {
          status: 'activebooking',
          errorMessage: 'Oops! Unable to delete this user. It seems the user is having active/upcoming bookings and they have to cancel or complete the bookings in order to delete them.'
        };
      }

      const updateUserStatus = await User.update({
        userDeletedAt: new Date()
      }, {
        where: {
          id: userId
        }
      });

      const deleteUserReviews = await Reviews.destroy({
        where: {
          authorId: userId
        }
      });

      if (updateUserStatus) {
        await Listing.destroy({
          where: {
            userId
          }
        });
      }

      const findThreads = await Threads.findAll({
        attributes: ['id', 'host'],
        where: {
          $or: [
            {
              host: userId
            },
            {
              guest: userId
            }
          ]
        },
        raw: true
      });

      if (findThreads && findThreads.length > 0) {
        findThreads.map(async (item, key) => {
          const checkEnquiry = await ThreadItems.findOne({
            attributes: ['id', 'type', 'startDate', 'endDate', 'personCapacity', 'startTime', 'endTime'],
            where: {
              threadId: item.id,
            },
            limit: 1,
            order: [['createdAt', 'DESC']],
            raw: true
          });

          if (checkEnquiry && checkEnquiry.type == 'inquiry') {
            const thread = await ThreadItems.create({
              threadId: item.id,
              sentBy: userId,
              type: userId === item.host ? 'cancelledByHost' : 'cancelledByGuest',
              startDate: checkEnquiry.startDate,
              endDate: checkEnquiry.endDate,
              personCapacity: checkEnquiry.personCapacity,
              startTime: checkEnquiry.startTime,
              endTime: checkEnquiry.endTime,
            });
          }
        });
      }

      // Check Both Tables are deleted
      if (updateUserStatus) {
        return { status: "success" };
      } else {
        return { status: "failed" };
      }
    } else {
      return { status: "failed" };
    }

  },
};

export default deleteUser;
