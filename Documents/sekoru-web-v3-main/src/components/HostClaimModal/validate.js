import messages from "../../locale/messages";

export default function validate(values) {
    const errors = {};

    if (isNaN(values.claimAmount) || (!/^[0-9\.]+$/.test(values.claimAmount)) || (parseFloat(values.claimAmount, 10) <= 0)) {
        errors.claimAmount = messages.claimAmountInvalid;
    }

    if (!values.claimAmount || (values.claimAmount && values.claimAmount.toString().trim() === '')) {
        errors.claimAmount = messages.required;
    }

    if (values.securityDeposit && values.claimAmount && Number(Number(values.securityDeposit).toFixed(2)) < Number(values.claimAmount)) {
        errors.claimAmount = messages.claimAmountBigger;
    }

    if (!values.claimReason || values.claimReason.toString().trim() === '') {
        errors.claimReason = messages.required;
    }

    if(!values.claimImages || values.claimImages.length < 1){
        errors.claimImages = messages.required;
    }
    return errors;
}