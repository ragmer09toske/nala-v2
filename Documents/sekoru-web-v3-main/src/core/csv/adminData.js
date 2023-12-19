import moment from 'moment';
import {
    User,
    UserProfile,
    Reservation,
    Listing
} from '../../data/models';
import sequelize from '../../data/sequelize';
import { securityDepositSearchHelper, getPayoutData } from '../../helpers/adminSearchHelpers';

function getQuery(column, separator) {
    return sequelize.literal(`IF(${column} IS NULL OR ${column}="", "", CONCAT(${column},${separator}))`)
}

export async function users(search) {
    try {
        let deleteFilter = { userDeletedAt: null }, searchFilter = {};

        if (search) {
            let getDate = moment(search).format('YYYY-MM-DD');
            searchFilter = {
                $or: [
                    {
                        id: {
                            $in: [
                                sequelize.literal(`
                                      SELECT
                                        userId
                                      FROM
                                        UserProfile
                                      WHERE 
                                        firstName like "%${search}%"
                                      OR 
                                        phoneNumber like "%${search}%"
                                      OR
                                        createdAt like "%${getDate}%"
                                      `)
                            ]
                        }
                    },
                    { email: { $like: '%' + search + '%' } }
                ]
            };
        }

        const result = await User.findAll({
            attributes: [
                [sequelize.col('profile.profileId'), 'ID'],
                [sequelize.col('profile.firstName'), 'Name'],
                ['email', 'Email'],
                [sequelize.col('profile.phoneNumber'), 'Phone'],
                [sequelize.col('profile.createdAt'), 'Created at'],
                [sequelize.col('profile.dateOfBirth'), 'Birthday'],
                [sequelize.col('profile.gender'), 'Gender'],
                [sequelize.col('profile.info'), 'Bio info'],
                [sequelize.col('profile.location'), 'Location'],
                [
                    sequelize.literal(`
                        CASE WHEN userBanStatus=true 
                            THEN 'Ban'
                        ELSE 
                            'UnBan'
                        END
                    `),
                    'User status'
                ]
            ],
            where: {
                $and: [
                    deleteFilter,
                    searchFilter
                ]
            },
            include: [{
                model: UserProfile,
                as: 'profile',
                attributes: []
            }],
            order: [['createdAt', 'ASC']],
            raw: true,
        });

        return result;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function reservations(search) {
    try {
        let isRefunded = `SELECT id FROM Transaction WHERE reservationId=Reservation.id AND paymentType='cancellation'`,
            refundAmount = `SELECT refundToGuest FROM CancellationDetails WHERE reservationId=Reservation.id`,
            isPaidOut = `SELECT id FROM TransactionHistory WHERE reservationId=Reservation.id`,
            payoutAmount = `SELECT payoutToHost FROM CancellationDetails WHERE reservationId=Reservation.id`;

        let paymentStateFilter = { paymentState: 'completed' }, searchFilter = {};

        if (search) {
            searchFilter = {
                $or: [
                    { confirmationCode: { $like: '%' + search + '%' } },
                    { reservationState: { $like: '%' + search + '%' } },
                    { listId: { $in: [sequelize.literal(`SELECT id FROM Listing WHERE title like "%${search}%"`)] } }
                ]
            }
        }

        const result = await Reservation.findAll({
            attributes: [
                ['id', 'Reservation ID'],
                ['confirmationCode', 'Code'],
                ['reservationState', 'Status'],
                ['guestServiceFee', 'Renter Service Fee'],
                ['hostServiceFee', 'Car Owner Service Fee'],
                ['checkIn', 'Trip Start'],
                ['checkOut', 'Trip End'],
                ['securityDeposit', 'Security Deposit'],
                [sequelize.literal(`(SELECT title FROM Listing WHERE id=Reservation.listId)`), 'Car Name'],
                [sequelize.literal(`(SELECT firstName FROM UserProfile WHERE userId=Reservation.guestId)`), 'Renter Name'],
                [sequelize.literal(`(SELECT phoneNumber FROM UserProfile WHERE userId=Reservation.guestId)`), 'Renter Phone Number'],
                [sequelize.literal(`(SELECT email FROM User WHERE id=Reservation.guestId)`), 'Renter Email'],
                [sequelize.literal(`(SELECT firstName FROM UserProfile WHERE userId=Reservation.hostId)`), 'Car Owner Name'],
                [sequelize.literal(`(SELECT phoneNumber FROM UserProfile WHERE userId=Reservation.hostId)`), 'Car Owner Phone Number'],
                [sequelize.literal(`(SELECT email FROM User WHERE id=Reservation.hostId)`), 'Car Owner Email'],
                [sequelize.literal(`(SELECT createdAt FROM CancellationDetails WHERE reservationId=Reservation.id)`), 'CancelDate'],
                [sequelize.literal(`(SELECT refundToGuest FROM CancellationDetails WHERE reservationId=Reservation.id)`), 'RefundAmount'],
                [sequelize.literal(`(SELECT payoutToHost FROM CancellationDetails WHERE reservationId=Reservation.id)`), 'PayoutAmount'],
                [
                    sequelize.literal(`
                        CASE WHEN reservationState='expired' OR reservationState='declined'
                            THEN IF((${isRefunded}) IS NULL,'Proceed Refund','Completed')
                        ELSE 
                            CASE WHEN reservationState='cancelled'
                                THEN IF((${isRefunded}) IS NULL, (IF((${refundAmount}) > 0,'Proceed Refund','Not Eligible')),'Completed')
                            ELSE
                                'Not Eligible'
                            END
                        END
                    `),
                    'Refund to Renter'
                ],
                ['currency', 'Currency'],
                [sequelize.literal(`total+guestServiceFee`), 'Sub Total'],
                [
                    sequelize.literal(`
                        CASE WHEN (
                            SELECT 
                                id 
                            FROM 
                                Payout AS P 
                            WHERE 
                                userId=Reservation.hostId 
                            AND 
                                (
                                    (P.default=true AND Reservation.payoutId IS NULL) 
                                    OR 
                                    (id=Reservation.payoutId AND id=Reservation.payoutId AND Reservation.payoutId IS NOT NULL)
                                )
                        ) is NULL
                            THEN "No Payout method"
                        ELSE 
                            CASE WHEN reservationState='expired' OR reservationState='declined'
                                THEN "Closed"
                            ELSE
                                CASE WHEN reservationState='cancelled'
                                    THEN IF((${isPaidOut}) IS NULL, (IF((${payoutAmount}) > 0,'Ready To Pay','Closed')),'Completed')
                                ELSE
                                    IF((${isPaidOut}) IS NULL, IF((DATEDIFF(Reservation.checkIn, NOW()) + 1) < 0,'Ready To Pay','Pending'), 'Completed')
                                END
                            END
                        END
                    `),
                    'Payout'
                ],
            ],
            where: {
                $and: [
                    paymentStateFilter,
                    searchFilter
                ]
            },
            order: [['createdAt', 'DESC']],
            raw: true,
        });
        if (result[0].CancelDate == null) {
            let data = await getPayoutData(result[0].Code)
            result[0].PayoutAmount = data
            return result;
        } else {
            return result;
        }
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function listings(search) {
    try {
        let searchFilter = {};
        if (search) {
            let getDate = moment(search).format('YYYY-MM-DD');
            searchFilter = {
                $or: [
                    { title: { $like: '%' + search + '%' } },
                    { city: { $like: '%' + search + '%' } },
                    { state: { $like: '%' + search + '%' } },
                    { country: { $like: '%' + search + '%' } },
                    { street: { $like: '%' + search + '%' } },
                    { buildingName: { $like: '%' + search + '%' } },
                    { createdAt: { $in: [sequelize.literal(`SELECT createdAt FROM Listing WHERE createdAt like "%${getDate}%"`)] } },
                    {
                        userId: {
                            $in: [
                                sequelize.literal(`
                                    SELECT 
                                        id 
                                    FROM 
                                        User AS user LEFT OUTER JOIN UserProfile AS profile 
                                    ON 
                                        user.id=profile.userId 
                                    WHERE 
                                        profile.firstName like "%${search}%" 
                                    OR 
                                        user.email like "%${search}%"
                                `)
                            ]
                        }
                    }
                ]
            }
        }
        const result = await Listing.findAll({
            attributes: [
                ['id', 'ID'],
                ['title', 'Title'],
                [
                    sequelize.literal(`(SELECT firstName FROM UserProfile WHERE userId=Listing.userId)`),
                    'Car Owner Name'
                ],
                [
                    sequelize.literal(`(SELECT email FROM User WHERE id=Listing.userId)`),
                    'Car Owner Email'
                ],
                [
                    sequelize.fn(
                        "concat",
                        getQuery('street', '", "'),
                        getQuery('buildingName', '", "'),
                        getQuery('city', '", "'),
                        getQuery('state', '", "'),
                        getQuery('country', '", "'),
                        getQuery('zipcode', '""')
                    ),
                    'Address'
                ],
                ['city', 'City'],
                ['state', 'State'],
                ['country', 'Country'],
                ['createdAt', 'Created Date'],
                [
                    sequelize.literal(`
                        CASE WHEN (select id FROM Recommend where listId=Listing.id) IS NULL
                            THEN 'No'
                        ELSE 
                            'Yes'
                        END
                    `),
                    'Recommend'
                ],
                [
                    sequelize.literal(`
                        CASE WHEN isPublished=true 
                            THEN 'Yes'
                        ELSE 
                            'No'
                        END
                    `),
                    'Published'
                ],
                [
                    sequelize.literal(`
                        CASE WHEN isReady=true 
                            THEN 'Yes'
                        ELSE 
                            'No'
                        END
                    `),
                    'Ready'
                ]
            ],
            where: { $and: [searchFilter] },
            order: [['id', 'ASC']],
            raw: true,
        });

        return result;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function securityDeposit(search, filterType) {

    let whereSearch = {}, claimFilter = {};

    if (filterType == 'claimed') claimFilter["claimStatus"] = { $in: ['approved', 'fullyRefunded'] };
    else if (filterType == 'nonClaimed') claimFilter["claimStatus"] = { $in: ['requested', 'pending'] };
    else claimFilter["claimStatus"] = { $in: ['requested', 'approved', 'fullyRefunded', 'pending'] };

    if (search) {
        whereSearch = { $or: securityDepositSearchHelper(search) }
    };

    const reservationData = await Reservation.findAll({
        attributes: [
            ['id', 'Booking ID'],
            [sequelize.literal(`(SELECT email FROM User WHERE id = Reservation.guestId)`), 'Renter Email'],
            [sequelize.literal(`(SELECT firstName FROM UserProfile WHERE userId = Reservation.guestId)`), 'Renter Name'],
            [sequelize.literal(`(SELECT email FROM User WHERE id = Reservation.hostId)`), 'Owner Email'],
            [sequelize.literal(`(SELECT firstName FROM UserProfile WHERE userId = Reservation.hostId)`), 'Owner Name'],
            ['securityDeposit', 'Security Deposit amount'],
            ['claimAmount', 'Claim amount requested by owner'],
            ['claimPayout', 'Security deposit amount Claimed by Owner'],
            ['claimRefund', 'Security deposit refunded to the Renter'],
            [
                sequelize.literal(`
                    CASE WHEN claimStatus='pending'  
                        THEN 'Proceed To Refund'
                    ELSE 
                      CASE WHEN claimStatus='requested'  
                        THEN 'Proceed To Refund'
                      ELSE 
                        CASE WHEN claimStatus='approved'  
                         THEN 'Claimed'
                        ELSE
                           'Refunded'
                        END
                      END
                    END
                `),
                'status'
            ],
        ],
        where: {
            paymentState: 'completed',
            securityDeposit: { $gt: 0 },
            ...whereSearch,
            ...claimFilter
        },
        raw: true
    })

    return reservationData;
}