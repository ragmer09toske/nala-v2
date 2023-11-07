import {
    GraphQLList as List,
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull,
} from 'graphql';
import moment from 'moment';
import sequelize from 'sequelize';
import { ListBlockedDates } from '../../models';
import ListBlockedDatesType from '../../types/ListBlockedDatesType';

const removeBlockedDates = {

    type: ListBlockedDatesType,

    args: {
        listId: { type: new NonNull(IntType) },
        blockedDates: { type: new List(StringType) },
    },

    async resolve({ request }, { listId, blockedDates }) {

        try {

            // Check whether user is logged in
            if (request.user || request.user.admin) {
                // Collect all records of Blocked Dates except Reservation Dates
                let day, dayList;
                const isExistDate = await Promise.all(blockedDates.map(async (item, key) => {
                    day = moment.utc(item).format('YYYY-MM-DD');
                    dayList = sequelize.where(sequelize.fn('DATE', sequelize.col('blockedDates')), day);
                    const blockedDatesData = await ListBlockedDates.count({
                        where: {
                            listId,
                            reservationId: {
                                $ne: null
                            },
                            blockedDates: dayList
                        }
                    });
                    return blockedDatesData;
                }))

                if (isExistDate.includes(1)) return { status: '400' }

                await Promise.all(blockedDates.map(async (item, index) => {
                    day = moment.utc(item).format('YYYY-MM-DD');
                    dayList = sequelize.where(sequelize.fn('DATE', sequelize.col('blockedDates')), day);

                    let blockedDatesData = await ListBlockedDates.destroy({
                        where: {
                            listId,
                            reservationId: {
                                $eq: null
                            },
                            blockedDates: dayList
                        }
                    });

                    if (blockedDatesData) {
                        return {
                            status: '200'
                        }
                    } else {
                        return {
                            status: '400',
                            errorMessage: "Oops! Couldn't update the status. Please try again."
                        }
                    }

                }));

            } else {
                return {
                    status: "400",
                    errorMessage: "Oops! Please login and continue."
                };
            }
        } catch (error) {
            return {
                status: "400",
                errorMessage: "Oops! Something went wrong." + error
            }
        }
    },
};

export default removeBlockedDates;
