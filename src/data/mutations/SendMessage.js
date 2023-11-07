// GrpahQL
import {
  GraphQLList as List,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLNonNull as NonNull,
  GraphQLFloat as FloatType
} from 'graphql';
import ThreadItemsType from '../types/ThreadItemsType';
// Sequelize models
import { ThreadItems, Threads, User, UserProfile } from '../../data/models';
import { sendNotifications } from '../../helpers/sendNotifications';

const sendMessage = {
  type: ThreadItemsType,
  args: {
    threadId: { type: new NonNull(IntType) },
    content: { type: StringType },
    type: { type: StringType },
    startDate: { type: StringType },
    endDate: { type: StringType },
    personCapacity: { type: IntType },
    reservationId: { type: IntType },
    startTime: { type: FloatType },
    endTime: { type: FloatType },
  },
  async resolve({ request, response }, {
    threadId,
    content,
    type,
    startDate,
    endDate,
    personCapacity,
    reservationId,
    startTime,
    endTime
  }) {
    // Check if user already logged in
    if (request.user && !request.user.admin) {
      const userId = request.user.id;
      let notifyUserId, guestId, hostId, notifyUserType, messageContent;
      let userName, listId;
      let where = {
        id: userId,
        userBanStatus: 1
      }
      // Check whether User banned by admin
      const isUserBan = await User.findOne({ where });
      if (!isUserBan) {

        if (type == 'approved' || type == 'declined' || type == 'preApproved') {
          let statusFilter = {
            $in: ['approved', 'declined', 'preApproved']
          };
          const checkStatus = await ThreadItems.findOne({
            where: {
              threadId,
              sentBy: userId,
              startDate: startDate,
              endDate: endDate,
              personCapacity,
              reservationId,
              startTime: startTime,
              endTime: endTime,
              $or: [
                {
                  type: statusFilter
                }
              ]
            }
          });

          if (checkStatus) {
            return {
              status: 'alreadyPerformed',
            }
          }

        }

        // Create a thread item
        const threadItems = await ThreadItems.create({
          threadId,
          sentBy: userId,
          content,
          type,
          startDate,
          endDate,
          personCapacity,
          reservationId,
          startTime,
          endTime
        });

        if (threadItems) {
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

          const getThread = await Threads.findOne({
            where: {
              id: threadId
            },
            raw: true
          });

          if (getThread && getThread.host && getThread.guest && getThread.listId) {
            notifyUserId = getThread.host === userId ? getThread.guest : getThread.host;
            notifyUserType = getThread.host === userId ? 'renter' : 'owner';
            guestId = getThread.host === userId ? getThread.guest : getThread.host;
            hostId = getThread.host === userId ? getThread.host : getThread.guest;
            listId = getThread.listId;
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

          messageContent = userName + ': ' + content;

          let notifyContent = {
            "screenType": "message",
            "title": "New Message",
            "userType": notifyUserType.toString(),
            "message": messageContent.toString(),
            "threadId": threadId.toString(),
            "guestId": guestId.toString(),
            "guestName": guestProfile && ((guestProfile.displayName).toString()),
            "guestPicture": (guestProfile && guestProfile.picture) ? ((guestProfile.picture).toString()) : '',
            "hostId": hostId.toString(),
            "hostName": hostProfile && ((hostProfile.displayName).toString()),
            "hostPicture": (hostProfile && hostProfile.picture) ? ((hostProfile.picture).toString()) : '',
            "guestProfileId": guestProfile && ((guestProfile.profileId).toString()),
            "hostProfileId": hostProfile && ((hostProfile.profileId).toString()),
            "listId": listId.toString()
          };

          if (type == 'preApproved') {


            messageContent = userName + ': ' + 'Your request is pre-approved';

            // notifyContent = {
            //   "screenType": "trips",
            //   "title": "New Booking",
            //   "userType": "guest",
            //   "message": messageContent.toString(),
            // };

            notifyContent = {
              "screenType": "message",
              "title": "New Booking",
              "userType": "renter",
              "message": messageContent.toString(),
              "threadId": threadId.toString(),
              "guestId": guestId.toString(),
              "guestName": guestProfile && ((guestProfile.displayName).toString()),
              "guestPicture": (guestProfile && guestProfile.picture) ? ((guestProfile.picture).toString()) : '',
              "hostId": hostId.toString(),
              "hostName": hostProfile && ((hostProfile.displayName).toString()),
              "hostPicture": (hostProfile && hostProfile.picture) ? ((hostProfile.picture).toString()) : '',
              "guestProfileId": guestProfile && ((guestProfile.profileId).toString()),
              "hostProfileId": hostProfile && ((hostProfile.profileId).toString()),
              "listId": listId.toString()
            };

          }

          if (type !== 'approved' && type !== 'declined') {
            sendNotifications(notifyContent, notifyUserId);
          }

          return threadItems;
        } else {
          return {
            status: 'failed to create thread items'
          }
        }
      } else {
        return {
          status: 'userbanned'
        }
      }
    } else {
      return {
        status: "notLoggedIn",
      };
    }
  },
};
export default sendMessage;
