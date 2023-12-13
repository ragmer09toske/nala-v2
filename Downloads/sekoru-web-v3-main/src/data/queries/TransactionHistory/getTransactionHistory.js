import AllReservationType from '../../types/AllReservationType';
import { Reservation, TransactionHistory } from '../../models';
import sequelize from '../../sequelize';

import {
    GraphQLList as List,
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull,
    GraphQLBoolean as BooleanType,
    GraphQLFloat as FloatType
} from 'graphql';

const getTransactionHistory = {

    type: AllReservationType,

    args: {
        mode: { type: StringType },
        payoutId: { type: IntType },
        listId: { type: IntType },
        currentPage: { type: IntType },
        searchKey: { type: StringType },
    },

    async resolve({ request }, { mode, payoutId, listId, currentPage, searchKey }) {
        const limit = 5;
        let offset = 0, totalWhere = {};
        // Offset from Current Page
        if (currentPage) {
            offset = (currentPage - 1) * limit;
        }
        if (request.user && !request.user.admin) {
            const hostId = request.user.id;
            let reservationRule = {
                hostId,
                paymentState: 'completed',
                $or: []
            };
            totalWhere = { ...reservationRule };
            if (mode === 'completed' || mode === 'grossEarnings') {

                reservationRule['$or'].push({ reservationState: 'completed' });

                reservationRule['$or'].push({
                    $and: [
                        { reservationState: 'cancelled' },
                        {
                            id: {
                                $in: [
                                    sequelize.literal(`SELECT reservationId FROM CancellationDetails where payoutToHost > 0`)
                                ]
                            }
                        }
                    ]
                });

                if (payoutId && payoutId > 0) {
                    reservationRule['id'] = {
                        $in: [
                            sequelize.literal(`SELECT reservationId FROM TransactionHistory where payoutId=${payoutId}`)
                        ]
                    };
                }
            } else {
                reservationRule['$or'].push({ reservationState: 'approved' });
                reservationRule['id'] = {
                    $notIn: [
                        sequelize.literal("SELECT reservationId FROM TransactionHistory")
                    ]
                };
				totalWhere = { ...reservationRule };
            }

            if (listId && listId > 0) reservationRule['listId'] = listId;

            if (searchKey) {
                reservationRule['$and'] = [];
                reservationRule['$and'].push({
                    $or: [
                        {
                            listId: {
                                $in: [
                                    sequelize.literal(`SELECT id FROM Listing WHERE title like "%${searchKey}%"`)
                                ]
                            }
                        },
                        {
                            guestId: {
                                $in: [
                                    sequelize.literal(`SELECT userId FROM UserProfile WHERE firstName like "%${searchKey}%"`)
                                ]
                            }
                        },
                        {
                            id: {
                                $in: [
                                    sequelize.literal(`SELECT id FROM Reservation WHERE confirmationCode like "%${searchKey}%"`)
                                ]
                            }
                        },
                    ]
                }
                );
            }

            const count = await Reservation.count({ where: reservationRule });
			const totalCount = await Reservation.count({ where: totalWhere });
            const totalReservations = await Reservation.findAll({ attributes: ['id', 'total', 'hostServiceFee', 'currency', 'claimPayout', 'isClaimPaidOut'], where: reservationRule });

            const reservationData = await Reservation.findAll({
                where: reservationRule,
                order: [['checkIn', 'ASC']],
                limit: limit,
                offset: offset,
            });

            return {
                reservationData,
                count,
                totalCount,
                totalData: totalReservations
            }

        } else {
            return {
                status: 'notLoggedIn',
            };
        }
    }
};

export default getTransactionHistory;

/**
query getTransactionHistory ($mode: String, $payoutId: Int, $listId: Int){
  getTransactionHistory(mode: $mode, payoutId: $payoutId, listId: $listId){
    id
    listId
    checkIn
    checkOut
    guestServiceFee
    hostServiceFee
    reservationState
    total
    listData {
      id
      title
      street
      city
      state
      country
    }
    hostTransaction {
      id
      amount
      currency
    }
    hostPayout {
      id
      payEmail
    }
    hostData {
      profileId
      displayName
      picture
    }
    guestData {
      profileId
      displayName
      picture
    }
  }
}

**/