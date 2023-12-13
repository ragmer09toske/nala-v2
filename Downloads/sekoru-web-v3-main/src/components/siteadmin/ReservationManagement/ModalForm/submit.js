// Redux Actions
import { payoutHost } from '../../../../actions/Reservation/payoutHost';
import { refundGuest } from '../../../../actions/Reservation/refundGuest';
import { closeReservationModal } from '../../../../actions/Reservation/payoutModal';

async function submit(values, dispatch) {
	let paymentCurrency = values.paymentMethodId == 1 ? values.paymentCurrency : null;
	
	if(values.type === 'owner'){
		paymentCurrency = values.paymentMethodId == 2 ? values.payoutCurrency : paymentCurrency;
		if (values.changeState) values.changeState('addPayout', values.reservationId);
		dispatch(
			payoutHost(
				values.reservationId, 
				values.receiverEmail, 
				values.payoutId, 
				values.amount, 
				values.currency,
				paymentCurrency,
				values.hostId,
				values.paymentMethodId,
				values.hostEmail,
				values.changeState
			)
		);
		dispatch(closeReservationModal());
	}

	if(values.type === 'renter'){
		if (values.changeState) values.changeState('addRefund', values.reservationId);
		dispatch(
			refundGuest(
				values.reservationId, 
				values.receiverEmail, 
				values.receiverId,
				values.payerEmail,
				values.payerId,
				values.amount, 
				values.currency,
				paymentCurrency,
				values.paymentMethodId,
				values.transactionId,
				values.changeState
			)
		);
		dispatch(closeReservationModal());
	}
}

export default submit;
