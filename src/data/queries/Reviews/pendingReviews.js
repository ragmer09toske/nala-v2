// GrpahQL
import {
    GraphQLList as List,
} from 'graphql';
import sequelize from '../../sequelize';
// Sequelize models
import { Reservation } from '../../models';
import ReservationType from '../../types/ReservationType';

const pendingReviews = {

    type: new List(ReservationType),

    async resolve({ request, response }) {
        if (!request.user) {
            return {
                status: 'notLoggedIn'
            };
        }
        const userId = request.user.id;
        return await Reservation.findAll({
            where: {
                reservationState: 'completed',
                $or: [
                    {
                        hostId: userId
                    },
                    {
                        guestId: userId
                    }
                ],
                id: {
                    $notIn: [
                        sequelize.literal(`SELECT reservationId FROM Reviews WHERE authorId='${userId}'`)
                    ]
                }
            },
        });
    },
};

export default pendingReviews;

/**
query PendingReviews{
  pendingReviews{
    id
    listId
    hostData {
      userId
      profileId
      firstName
      lastName
      picture
      userData {
        email
      }
    }
    guestData {
      userId
      profileId
      firstName
      lastName
      picture
      userData {
        email
      }
    }
  }
}
**/