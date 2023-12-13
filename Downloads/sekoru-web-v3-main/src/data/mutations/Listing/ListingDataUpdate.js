// GrpahQL
import {
    GraphQLList as List,
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLFloat as FloatType,
} from 'graphql';
// GraphQL Type
import EditListingType from '../../types/EditListingType';
// Sequelize models
import {
    Listing,
    UserHouseRules,
    ListingData,
} from '../../../data/models';

const ListingDataUpdate = {

    type: EditListingType,

    args: {
        id: { type: IntType },
        houseRules: { type: new List(IntType) },
        checkInStart: { type: StringType },
        checkInEnd: { type: StringType },
        minDay: { type: IntType },
        maxDay: { type: IntType },
        cancellationPolicy: { type: IntType },
        maxDaysNotice: { type: StringType },
        bookingNoticeTime: { type: StringType },
        basePrice: { type: FloatType },
        delivery: { type: FloatType },
        currency: { type: StringType },
        weeklyDiscount: { type: FloatType },
        monthlyDiscount: { type: FloatType }
    },

    async resolve({ request, response }, {
        id,
        houseRules,
        checkInStart,
        checkInEnd,
        minDay,
        maxDay,
        cancellationPolicy,
        maxDaysNotice,
        bookingNoticeTime,
        basePrice,
        delivery,
        currency,
        weeklyDiscount,
        monthlyDiscount
    }) {

        let isListUpdated = false;

        // Check whether user is logged in
        if (request.user || request.user.admin) {
            let where = { id };
            if (!request.user.admin) {
                where = {
                    id,
                    userId: request.user.id
                }
            };

            // Confirm whether the Listing Id is available
            const isListingAvailable = await Listing.findById(id);

            if (isListingAvailable != null) {

                if (houseRules) {
                    const removeHouseRules = await UserHouseRules.destroy({
                        where: {
                            listId: id
                        }
                    });
                    if (houseRules.length > 0) {
                        houseRules.map(async (item, key) => {
                            let updateHouseRules = await UserHouseRules.create({
                                listId: id,
                                houseRulesId: item
                            })
                        });
                    }
                }

                let maxDaysNoticeValue = "available";
                // Check if record already available for this listing
                const isListingIdAvailable = await ListingData.findOne({ where: { listId: id } });
                if (isListingIdAvailable != null) {
                    // Update Record
                    const updateData = await ListingData.update({
                        checkInStart: checkInStart,
                        checkInEnd: checkInEnd,
                        minDay: minDay,
                        maxDay: maxDay,
                        cancellationPolicy: cancellationPolicy,
                        maxDaysNotice: maxDaysNotice,
                        bookingNoticeTime: bookingNoticeTime,
                        basePrice: basePrice,
                        delivery: delivery,
                        currency: currency,
                        weeklyDiscount,
                        monthlyDiscount
                    },
                        {
                            where: {
                                listId: id
                            }
                        });
                    isListUpdated = true;

                } else {
                    // Create New Record
                    const createData = await ListingData.create({
                        listId: id,
                        checkInStart: checkInStart,
                        checkInEnd: checkInEnd,
                        minDay: minDay,
                        maxDay: maxDay,
                        cancellationPolicy: cancellationPolicy,
                        maxDaysNotice: maxDaysNotice,
                        bookingNoticeTime: bookingNoticeTime,
                        basePrice: basePrice,
                        delivery: delivery,
                        currency: currency,
                        weeklyDiscount,
                        monthlyDiscount
                    });

                    if (createData) {
                        isListUpdated = true;
                    }
                }


                if (isListUpdated) {
                    return {
                        status: 'success'
                    }
                } else {
                    return {
                        status: 'failed'
                    }
                }

            } else {
                return {
                    status: 'notAvailable'
                }
            }

        } else {
            return {
                status: "notLoggedIn",
            };
        }

    },
};

export default ListingDataUpdate;