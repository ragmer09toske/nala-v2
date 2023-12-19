import messages from "../../locale/messages";

export default function validate(values) {
    const errors = {};

    if (isNaN(values.claimRefund) || (!/^[0-9\.]+$/.test(values.claimRefund)) || (parseFloat(values.claimRefund, 10) <= 0)) {
        errors.claimRefund = messages.claimAmountInvalid;
    }

    if (!values.claimRefund || (values.claimRefund && values.claimRefund.toString().trim() === '')) {
        errors.claimRefund = messages.required;
    }

    if (values.securityDeposit && values.claimRefund && Number(Number(values.securityDeposit).toFixed(2)) < Number(values.claimRefund)) {
        errors.claimRefund = messages.claimRefundBigger;
    }
    return errors;
}