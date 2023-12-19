
import messages from '../../locale/messages';


const validateStep3 = values => {

	const errors = {};

	// if (Number(values.checkInStart) >= Number(values.checkInEnd)) {
	// 	errors.checkInStart = messages.advanceNoticeError;
	// }

	// if (Number(values.checkInStart) < 8 || Number(values.checkInStart) > 25) {
	// 	errors.checkInStart = messages.advanceNoticeInvalid;
	// }

	// if (Number(values.checkInEnd) < 9 || Number(values.checkInEnd) > 26) {
	// 	errors.checkInEnd = messages.advanceNoticeInvalid;
	// }

	if (!values.basePrice) {
		errors.basePrice = messages.required;
	}

	if (isNaN(values.basePrice) || (!/^[0-9\.]+$/.test(values.basePrice)) || (parseFloat(values.basePrice, 10) < 1)) {
		errors.basePrice = messages.basePriceInvalid;
	}

	if (values.delivery) {
		if (isNaN(values.delivery) || (!/^[0-9\.]+$/.test(values.delivery)) || (parseInt(values.delivery, 10) < 1)) {
			errors.delivery = messages.cleaningPriceInvalid;
		}
	}

	if (values.securityDeposit && (isNaN(values.securityDeposit) || (!/^[0-9\.]+$/.test(values.securityDeposit)) || (parseFloat(values.securityDeposit, 10) < 1))) {
		errors.securityDeposit = messages.securityDepositInvalid;
	}

	if (values.weeklyDiscount) {
		if (isNaN(values.weeklyDiscount) || (!/^[0-9]+$/.test(values.weeklyDiscount)) || (parseInt(values.weeklyDiscount, 10) < 0) || parseInt(values.weeklyDiscount, 10) > 99) {
			errors.weeklyDiscount = messages.discountInvalid;
		}
	}

	if (values.monthlyDiscount) {
		if (isNaN(values.monthlyDiscount) || (!/^[0-9]+$/.test(values.monthlyDiscount)) || (parseInt(values.monthlyDiscount, 10) < 0) || parseInt(values.monthlyDiscount, 10) > 99) {
			errors.monthlyDiscount = messages.discountInvalid;
		}
	}

	/*if(values.weeklyDiscount) {
		  if(values.weeklyDiscount != parseInt(values.weeklyDiscount, 10)){
			errors.weeklyDiscount = messages.discountInvalid;
		  }
		  if(parseInt(values.weeklyDiscount, 10) < 0 || parseInt(values.weeklyDiscount, 10) > 99){
			errors.weeklyDiscount = messages.discountInvalid;
		  }
	}
  
	if(values.monthlyDiscount) {
		  if(values.monthlyDiscount != parseInt(values.monthlyDiscount, 10)){
			errors.monthlyDiscount = messages.discountInvalid;
		  }
		  if(parseInt(values.monthlyDiscount, 10) < 0 || parseInt(values.monthlyDiscount, 10) > 99){
			errors.monthlyDiscount = messages.discountInvalid;
		  }
	}*/

	if (Number(values.maxDay) > 0) {
		if (values.minDay > values.maxDay) {
			errors.minDay = messages.tripLengthError1;
		}
		if (values.minDay == values.maxDay) {
			errors.minDay = messages.tripLengthError2;
		}
	}

	return errors;
}

export default validateStep3;
