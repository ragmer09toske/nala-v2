import ReservationType from "../../types/ReservationType";
import {
    GraphQLInt as IntType,
    GraphQLFloat as FloatType,
    GraphQLNonNull as NonNull,
    GraphQLList as List,
    GraphQLString as StringType
} from 'graphql';
import { ClaimImages, Reservation, ThreadItems, Threads } from "../../models";

const updateClaimForHost = {
    type: ReservationType,
    args: {
        reservationId: { type: new NonNull(IntType) },
        claimAmount: { type: new NonNull(FloatType) },
        claimImages: { type: new List(StringType) },
        claimReason: { type: new NonNull(StringType) }
    },
    async resolve({ request }, { reservationId, claimAmount, claimImages, claimReason }) {
        try {
            if (!request.user || !request.user.id) return { status: 500, errorMessage: "Please login" };

            const reservation = await Reservation.findOne({
                where: {
                    id: reservationId,
                    hostId: request.user.id,
                    claimAmount: 0,
                    claimStatus: 'pending',
                    securityDeposit: { $gte: claimAmount }
                }, raw: true
            });
            if (!reservation) return { status: 400, errorMessage: 'Something went wrong!' };

            await Reservation.update({ claimAmount, claimStatus: 'requested', claimReason, claimRequestDate: new Date() }, { where: { id: reservationId } });

            if (Array.isArray(claimImages) && claimImages.length > 0) await ClaimImages.bulkCreate(claimImages.map(item => ({ reservationId, image: item })));

            const threadItems = await ThreadItems.findOne({ where: { reservationId }, raw: true });
            if (threadItems) {
                await ThreadItems.create({ reservationId, type: 'claimRequested', sentBy: request.user.id, startDate: threadItems.startDate, threadId: threadItems.threadId, endDate: threadItems.endDate, startTime: threadItems.startTime, endTime: threadItems.endTime, personCapacity: threadItems.personCapacity });
                await Threads.update({
                    isRead: false,
                    messageUpdatedDate: new Date()
                },
                    {
                        where: {
                            id: threadItems.threadId
                        }
                    }
                );
            }

            return { status: 200 };
        } catch (error) {
            return { status: 400, errorMessage: error };
        }
    }
}

export default updateClaimForHost;