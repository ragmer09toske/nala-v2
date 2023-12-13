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

import sequelize from '../sequelize';
import moment from 'moment';


// Models
import {
    Listing,
    UserProfile,
    Threads,
    Payout,
    TransactionHistory,
    Transaction,
    CancellationDetails,
    User,
    ThreadItems,
    Cancellation,
    ReservationSpecialPricing,
    Country,
    FailedTransactionHistory,
    ClaimImages
} from '../models';

// Type
import ThreadsType from './ThreadsType';
import ShowListingType from './ShowListingType';
import ProfileEncryptType from './ProfileEncryptType';
import PayoutType from './PayoutType';
import TransactionHistoryType from './TransactionHistoryType';
import TransactionType from './TransactionType';
import CancellationDetailsType from './CancellationDetailsType';
import UserType from './UserType';
import ThreadItemsType from './ThreadItemsType';
import CancellationType from './CancellationType';
import ReservationSpecialPricingType from './ReservationSpecialPricingType';
import FailedTransactionHistoryType from './FailedTransactionHistoryType';

import { encode } from '../../helpers/queryEncryption';

const ReservationType = new ObjectType({
    name: 'Reservation',
    fields: {
        id: {
            type: IntType
        },
        listId: {
            type: IntType
        },
        listData: {
            type: ShowListingType,
            resolve(reservation) {
                return Listing.findOne({
                    where: { id: reservation.listId }
                })
            }
        },
        hostId: {
            type: StringType
        },
        listTitle: {
            type: StringType
        },
        hostPayout: {
            type: PayoutType,
            resolve(reservation) {
                if (reservation.payoutId != null && reservation.payoutId > 0) {
                    return Payout.findOne({
                        where: {
                            userId: reservation.hostId,
                            id: reservation.payoutId
                        }
                    })
                } else {
                    return Payout.findOne({
                        where: {
                            userId: reservation.hostId,
                            default: true
                        }
                    })
                }
            }
        },
        hostTransaction: {
            type: TransactionHistoryType,
            resolve(reservation) {
                return TransactionHistory.findOne({
                    where: {
                        reservationId: reservation.id,
                        payoutType: 'payout'
                    }
                })
            }
        },
        claimTransaction: {
            type: TransactionHistoryType,
            resolve(reservation) {
                return TransactionHistory.findOne({
                    where: {
                        reservationId: reservation.id,
                        payoutType: 'claimPayout'
                    }
                })
            }
        },
        hostFailedTransaction: {
            type: FailedTransactionHistoryType,
            resolve(reservation) {
                return FailedTransactionHistory.findOne({
                    where: {
                        reservationId: reservation.id,
                        payoutType: 'payout'
                    }
                });
            }
        },
        claimFailedTransaction: {
            type: FailedTransactionHistoryType,
            resolve(reservation) {
                return FailedTransactionHistory.findOne({
                    where: {
                        reservationId: reservation.id,
                        payoutType: 'claimPayout'
                    }
                });
            }
        },
        hostData: {
            type: ProfileEncryptType,
            async resolve(reservation) {
                let hostData = await UserProfile.findOne({
                    where: { userId: reservation.hostId },
                    raw: true
                });
                let phoneNumberEncrypt = { 'phoneNumber': encode(hostData.phoneNumber) }

                return await { ...hostData, ...phoneNumberEncrypt }
            }
        },
        guestId: {
            type: StringType
        },
        guestData: {
            type: ProfileEncryptType,
            async resolve(reservation) {
                let guestData = await UserProfile.findOne({
                    where: { userId: reservation.guestId },
                    raw: true
                });
                let phoneNumberEncrypt = { 'phoneNumber': encode(guestData.phoneNumber) }

                return await { ...guestData, ...phoneNumberEncrypt }
            }
        },
        transaction: {
            type: TransactionType,
            resolve(reservation) {
                return Transaction.findOne({
                    where: { reservationId: reservation.id, paymentType: 'booking' }
                })
            }
        },
        refundStatus: {
            type: TransactionType,
            resolve(reservation) {
                return Transaction.findOne({
                    where: { reservationId: reservation.id, paymentType: 'cancellation' }
                })
            }
        },
        guestUser: {
            type: UserType,
            resolve(reservation) {
                return User.findOne({
                    where: { Id: reservation.guestId }
                })
            }
        },
        hostUser: {
            type: UserType,
            resolve(reservation) {
                return User.findOne({
                    where: { Id: reservation.hostId }
                })
            }
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
        cleaningPrice: {
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
        isHold: {
            type: BooleanType
        },
        paymentAttempt: {
            type: IntType
        },
        messageData: {
            type: ThreadsType,
            resolve(reservation) {
                return Threads.findOne({
                    where: {
                        listId: reservation.listId,
                        $or: [
                            {
                                host: reservation.guestId
                            },
                            {
                                guest: reservation.guestId
                            }
                        ]
                    }
                });
            }
        },
        cancellationDetails: {
            type: CancellationDetailsType,
            resolve(reservation) {
                return CancellationDetails.findOne({
                    where: {
                        reservationId: reservation.id
                    }
                });
            }
        },
        createdAt: {
            type: StringType
        },
        updatedAt: {
            type: StringType
        },
        count: {
            type: IntType
        },
        status: {
            type: StringType
        },
        errorMessage: {
            type: StringType
        },
        paymentMethodId: {
            type: IntType
        },
        threadData: {
            type: ThreadItemsType,
            resolve(reservation) {
                return ThreadItems.findOne({
                    where: {
                        reservationId: reservation.id,
                    }
                });
            }
        },
        cancellationPolicy: {
            type: IntType
        },
        cancellation: {
            type: CancellationType,
            resolve(reservation) {
                return Cancellation.findOne({
                    where: {
                        id: reservation.cancellationPolicy,
                        isEnable: true
                    }
                });
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
        isSpecialPriceAverage: {
            type: FloatType
        },

        dayDifference: {
            type: FloatType
        },
        delivery: {
            type: FloatType
        },
        startTime: {
            type: FloatType
        },
        endTime: {
            type: FloatType
        },
        licenseNumber: {
            type: StringType
        },
        firstName: {
            type: StringType
        },
        middleName: {
            type: StringType
        },
        lastName: {
            type: StringType
        },
        dateOfBirth: {
            type: StringType
        },
        countryCode: {
            type: StringType
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
        claimRefundedAt: {
            type: StringType,
            async resolve(reservation) {
                const threadItems = await ThreadItems.findOne({ where: { reservationId: reservation.id, type: 'claimRefunded' }, raw: true });
                return threadItems && threadItems.createdAt;
            }
        },
        isClaimPaidOut: {
            type: BooleanType
        },
        isClaimRefunded: {
            type: BooleanType
        },
        countryLabel: {
            type: StringType,
            async resolve(listSettings) {
                if (listSettings && listSettings.countryCode) {
                    let foundSetting = await Country.findOne({
                        where: {
                            countryCode: listSettings.countryCode
                        }
                    })
                    return foundSetting.countryName;
                }

            }

        }
    }
});

export default ReservationType;