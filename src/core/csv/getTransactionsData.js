import moment from 'moment';
import sequelize from '../../data/sequelize';
import { TransactionHistory, Reservation, CurrencyRates, CancellationDetails, Currencies } from '../../data/models';
import { convert } from '../../helpers/currencyConvertion';

export function getFutureResult({ base, rates, reservation, toCurrency }) {
    let amount = Number(reservation.total) - Number(reservation.hostServiceFee);
    if (reservation.reservationState == 'cancelled') amount = reservation['cancellationDetails.payoutToHost'];
    return {
        "Date": reservation.checkIn ? moment(reservation.checkIn).add(1, 'days').format('DD-MM-YYYY') : 'Pending',
        "Check In": reservation.checkIn != null ? moment(reservation.checkIn).format('MMM DD, YYYY') : '',
        "Check Out": reservation.checkOut != null ? moment(reservation.checkOut).format('MMM DD, YYYY') : '',
        "Amount": amount > 0 ? (convert(base.symbol, rates, amount, reservation.currency, toCurrency)).toFixed(2) : amount,
        "Payout Account": reservation.payoutAccount ? reservation.payoutAccount : "Default",
        "Title": reservation.title,
        "First Name": reservation.firstName,
        "Confirmation Code": reservation.confirmationCode
    };
}

export function getGrossResult({ base, rates, reservation, toCurrency }) {
    let amount = Number(reservation.total) - Number(reservation.hostServiceFee);
    if (reservation.reservationState == 'cancelled') amount = reservation['cancellationDetails.payoutToHost'];
    return {
        "Date": reservation['transactionHistory.createdAt'] ? moment(reservation['transactionHistory.createdAt']).format('DD-MM-YYYY') : 'Pending',
        "Check In": reservation.checkIn != null ? moment(reservation.checkIn).format('MMM DD, YYYY') : '',
        "Check Out": reservation.checkOut != null ? moment(reservation.checkOut).format('MMM DD, YYYY') : '',
        "Amount": amount > 0 ? (convert(base.symbol, rates, amount, reservation.currency, toCurrency)).toFixed(2) : amount,
        "Confirmation Code": reservation.confirmationCode
    };
}

export function getCompletedResult({ base, rates, reservation, toCurrency }) {
    let transactionAmount = reservation['transactionHistory.amount'] && reservation['transactionHistory.amount'],
        total = Number(reservation.total) - Number(reservation.hostServiceFee);
    if (reservation.reservationState == 'cancelled') total = reservation['cancellationDetails.payoutToHost'];
    return {
        "Date": reservation.createdAt != null ? moment(reservation.createdAt).format('DD-MM-YYYY') : '',
        "Transaction Created": reservation['transactionHistory.createdAt'] ? moment(reservation['transactionHistory.createdAt']).format('DD-MM-YYYY') : '',
        "Transfer to": reservation['transactionHistory.payoutEmail'] && reservation['transactionHistory.payoutEmail'],
        "Transaction Amount": transactionAmount > 0 ? (convert(base.symbol, rates, transactionAmount, reservation['transactionHistory.currency'], toCurrency)).toFixed(2) : transactionAmount,
        "Check In": reservation.checkIn != null ? moment(reservation.checkIn).format('MMM DD, YYYY') : '',
        "Check Out": reservation.checkOut != null ? moment(reservation.checkOut).format('MMM DD, YYYY') : '',
        "Total Amount": total > 0 ? (convert(base.symbol, rates, total, reservation.currency, toCurrency)).toFixed(2) : total,
        "Confirmation Code": reservation.confirmationCode,
        "Title": reservation.title,
        "First Name": reservation.firstName
    };
}

export async function getTransactions({ hostId, toCurrency, type, listId, payoutId }) {
    try {
        let rates = {}, result = [];
        let transactionHistoryFilter = {}, listingFilter = {}, payoutFilter = {};

        if ((type === 'completed' || type === 'grossEarnings')) {
            payoutFilter = {
                $or: [
                    {
                        reservationState: 'completed'
                    }, {
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
                    }
                ]
            };
            if (payoutId && payoutId > 0) transactionHistoryFilter = { id: { $in: [sequelize.literal(`SELECT reservationId FROM TransactionHistory where payoutId=${payoutId}`)] } };
        }
        else if (type === 'future') {
            transactionHistoryFilter = {
                id: { $notIn: [sequelize.literal("SELECT reservationId FROM TransactionHistory")] },
            };
            payoutFilter = {
                reservationState: 'approved'
            };
        }

        if (listId) listingFilter = { listId };

        const reservations = await Reservation.findAll({
            attributes: [
                'currency',
                'total',
                'hostServiceFee',
                'checkIn',
                'checkOut',
                'confirmationCode',
                'createdAt',
                'reservationState',
                ['listTitle', 'listTitle'],
                [sequelize.literal(`(SELECT title FROM Listing WHERE id=Reservation.listId)`), 'title'],
                [sequelize.literal(`(SELECT firstName FROM UserProfile WHERE userId=Reservation.guestId)`), 'firstName'],
                [
                    sequelize.literal(`(
                        SELECT 
                            CASE WHEN methodId=1
                                THEN payEmail
                            ELSE 
                                IF(methodId=2, CONCAT("******",last4Digits), "")
                            END
                        FROM 
                            Payout 
                        WHERE 
                            id=Reservation.payoutId AND isVerified=true
                        )`),
                    'payoutAccount'
                ]
            ],
            where: {
                $and: [
                    { hostId },
                    { paymentState: 'completed' },
                    transactionHistoryFilter,
                    listingFilter,
                    payoutFilter
                ]
            },
            include: [
                {
                    model: TransactionHistory,
                    attributes: ['createdAt', 'amount', 'payoutEmail', 'currency'],
                    as: 'transactionHistory',
                    where: { userId: hostId },
                    required: false
                },
                {
                    model: CancellationDetails,
                    attributes: ['payoutToHost'],
                    as: 'cancellationDetails'
                }
            ],
            order: [['checkIn', 'ASC']],
            raw: true
        });

        if (reservations.length <= 0) return [];

        const data = await CurrencyRates.findAll();
        const base = await Currencies.findOne({ where: { isBaseCurrency: true } });

        if (data) data.map((item) => rates[item.dataValues.currencyCode] = item.dataValues.rate);

        result = reservations.map((reservation, key) => {
            if (type === 'completed') return getCompletedResult({ data, base, rates, reservation, toCurrency });
            if (type === 'grossEarnings') return getGrossResult({ data, base, rates, reservation, toCurrency });
            if (type === 'future') return getFutureResult({ data, base, rates, reservation, toCurrency });
        });

        return result;

    } catch (error) {
        console.error(error);
        return [];
    }
}