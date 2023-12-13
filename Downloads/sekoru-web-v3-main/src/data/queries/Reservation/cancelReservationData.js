import ReservationType from '../../types/ReservationType';
import {Reservation} from '../../models';

import {
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull,
} from 'graphql';

const cancelReservationData = {

    type:  ReservationType,

    args: {
        reservationId: { type: new NonNull(IntType) },
        userType: { type: new NonNull(StringType) },
    },

    async resolve({request}, {reservationId, userType}) {
        if(request.user) {
            const id = reservationId;
            const userId = request.user.id;           
            let where;
            let reservationState =  [ {reservationState: 'pending'}, {reservationState: 'approved'}];

            let checkOutNewDate = new Date();
            checkOutNewDate.setHours(0, 0, 0, 0);
            let checkOut = { $gte: checkOutNewDate };

            if(userType === 'owner'){
                where = {
                    id,
                    hostId: userId,
                    $or: reservationState,
                    checkOut
                };
            } else {
                where = {
                    id,
                    guestId: userId,
                    $or: reservationState,
                    checkOut
                };
            }
            
            return await Reservation.findOne({
                where
            });
        } else {
            return {
              status: "notLoggedIn",
            };
        }
    }
};

export default cancelReservationData;
