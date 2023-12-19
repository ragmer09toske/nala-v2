import moment from 'moment';
import sequelize from 'sequelize';
import {
    GraphQLList as List,
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull,
    GraphQLFloat as FloatType,
} from 'graphql';
import { ListBlockedDates } from '../../models';
import ListBlockedDatesType from '../../types/ListBlockedDatesType';

const UpdateBlockedDates = {

    type: ListBlockedDatesType,

    args: {
        listId: { type: new NonNull(IntType) },
        blockedDates: { type: new List(StringType) },
        calendarStatus: { type: StringType },
        isSpecialPrice: { type: FloatType }
    },

    async resolve({ request }, { listId, blockedDates, calendarStatus, isSpecialPrice }) {

        if (request.user || request.user.admin) {

            if (blockedDates) {

                let day, dayList, itemValue;

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

                let newBlockedDates = [];

                const existBlockedDates = await Promise.all(blockedDates.map(async (item, key) => {
                    day = moment(item).format('YYYY-MM-DD');
                    dayList = sequelize.where(sequelize.fn('DATE', sequelize.col('blockedDates')), day);

                    let blockedDatesFind = await ListBlockedDates.findOne({
                        attributes: ['blockedDates', 'id'],
                        where: {
                            blockedDates: dayList,
                            listId: listId,
                            reservationId: {
                                $eq: null
                            }
                        },
                        raw: true
                    })

                    if (blockedDatesFind && blockedDatesFind.id) {
                        newBlockedDates.push({
                            id: blockedDatesFind.id,
                            listId,
                            blockedDates: blockedDatesFind.blockedDates,
                            isSpecialPrice: isSpecialPrice > 0 ? isSpecialPrice : null,
                            calendarStatus: calendarStatus,
                        })
                    }
                    else {
                        newBlockedDates.push({
                            listId,
                            blockedDates: item,
                            isSpecialPrice: isSpecialPrice > 0 ? isSpecialPrice : null,
                            calendarStatus: calendarStatus,
                        })
                    }

                }));

                if (newBlockedDates && newBlockedDates.length > 0) {
                    const createNewBlockedDates = await ListBlockedDates.bulkCreate(newBlockedDates, {
                        updateOnDuplicate: ['listId', 'blockedDates', 'isSpecialPrice', 'calendarStatus']
                    })
                }

                return {
                    status: '200'
                };

            } else {
                return {
                    status: '500'
                };
            }
        }
    }
};

export default UpdateBlockedDates;


/**
mutation($listId: Int!, $blockedDates: [String]) {
    UpdateBlockedDates(listId: $listId, blockedDates: $blockedDates) {
        status
    }
}
 */
