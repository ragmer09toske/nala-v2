import sequelize from "../data/sequelize";
import { Reservation } from "../data/models";

export const securityDepositSearchHelper = search => {
    let userQuery = `
                SELECT
                  id
                FROM
                  User
                WHERE email like "%${search}%"
    `;
    let profileQuery = `
                SELECT
                  userId
                FROM
                  UserProfile
                WHERE firstName like "%${search}%"
    `;

    return [
        {
            hostId: {
                $in: [
                    sequelize.literal(userQuery)
                ]
            }
        },
        {
            guestId: {
                $in: [
                    sequelize.literal(userQuery)
                ]
            }
        },
        {
            hostId: {
                $in: [
                    sequelize.literal(profileQuery)
                ]
            }
        },
        {
            guestId: {
                $in: [
                    sequelize.literal(profileQuery)
                ]
            }
        },
        {
            id: {
                $like: '%' + search + '%'
            }
        },
    ]
}

export async function getPayoutData(Code) {
    let data, payoutAmount;
    data = await Reservation.findOne({
        attributes: ['total', 'hostServiceFee'],
        where: {
            confirmationCode: Code
        }
    })
    payoutAmount = Number(data.total) - Number(data.hostServiceFee)
    return payoutAmount;
}