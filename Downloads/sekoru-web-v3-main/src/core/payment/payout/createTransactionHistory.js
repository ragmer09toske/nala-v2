import { TransactionHistory } from '../../../data/models';

export async function createTransactionHistory(
    reservationId, 
    hostEmail, 
    payoutId, 
    amount, 
    fees,
    currency,
    userId,
    paymentMethodId,
    payoutType
  ) {
      const transactions = await TransactionHistory.create({
        reservationId, 
        payoutId,
        payoutEmail: hostEmail, 
        amount, 
        fees,
        currency,
        userId,
        paymentMethodId,
        payoutType
      });
}