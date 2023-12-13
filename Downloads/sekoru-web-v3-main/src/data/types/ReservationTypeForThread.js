import {
    GraphQLObjectType as ObjectType,
    GraphQLID as ID,
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull,
    GraphQLBoolean as BooleanType,
    GraphQLFloat as FloatType,
    GraphQLList as List,
} from 'graphql';

import moment from 'moment';

// Models
import {
    ClaimImages,
    ReservationSpecialPricing
} from '../models';

// Type
import ReservationSpecialPricingType from './ReservationSpecialPricingType';

const ReservationTypeForThread = new ObjectType({
    name: 'ReservationThread',
    fields: {
        id: {
            type: IntType
        },
        listId: {
            type: IntType
        },
        listTitle: {
            type: StringType
        },
        hostId: {
            type: StringType
        },
        guestId: {
            type: StringType
        },
        checkIn: {
            type: StringType
        },
        checkOut: {
            type: StringType
        },
        guests: {
            type: IntType
        },
        message: {
            type: StringType
        },
        basePrice: {
            type: FloatType
        },
        delivery: {
            type: FloatType
        },
        currency: {
            type: StringType
        },
        discount: {
            type: FloatType
        },
        discountType: {
            type: StringType
        },
        guestServiceFee: {
            type: FloatType,
        },
        hostServiceFee: {
            type: FloatType,
        },
        total: {
            type: FloatType,
        },
        confirmationCode: {
            type: IntType
        },
        reservationState: {
            type: StringType
        },
        paymentState: {
            type: StringType
        },
        payoutId: {
            type: IntType
        },
        createdAt: {
            type: StringType
        },
        updatedAt: {
            type: StringType
        },
        status: {
            type: StringType
        },
        paymentMethodId: {
            type: IntType
        },
        startTime: {
            type: FloatType
        },
        endTime: {
            type: FloatType
        },
        securityDeposit: {
            type: FloatType
        },
        claimStatus: {
            type: StringType
        },
        claimAmount: {
            type: FloatType
        },
        claimPayout: {
            type: FloatType
        },
        claimRefund: {
            type: FloatType
        },
        claimReason: {
            type: StringType
        },
        claimImages: {
            type: new List(StringType),
            async resolve(reservation) {
                const claimImages = await ClaimImages.findAll({ where: { reservationId: reservation.id }, raw: true });
                return claimImages.map(item => item.image);
            }
        },
        bookingSpecialPricing: {
            type: new List(ReservationSpecialPricingType),
            async resolve(reservation) {
                let convertedResponse = [];
                const listingSpecialPricingData = await ReservationSpecialPricing.findAll({
                    where: {
                        reservationId: reservation.id
                    },
                    order: [['blockedDates', 'ASC']],
                    raw: true
                });

                if (listingSpecialPricingData && listingSpecialPricingData.length > 0) {
                    Promise.all(listingSpecialPricingData.map((item) => {
                        convertedResponse.push({
                            "id": item.id,
                            "listId": item.listId,
                            "reservationId": item.reservationId,
                            "blockedDates": moment(item.blockedDates).utc().format('MM/DD/YYYY'),
                            "isSpecialPrice": item.isSpecialPrice
                        });
                    }));

                    return await convertedResponse;
                } else {
                    return await [];
                }
            }
        },
    }
});

export default ReservationTypeForThread;