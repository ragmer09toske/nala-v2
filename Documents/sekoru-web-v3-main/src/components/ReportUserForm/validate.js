import messages from "../../locale/messages";

const validate = values => {

    const errors = {}
    
    if (values.reportType == 'Not_allowed') {
        errors.reportType = messages.required;
    }
    return errors;

}
export default validate;
