
import messages from '../../locale/messages';


const validate = values => {

    const errors = {};

    if (values.isSpecialPrice <= 0) {
        errors.isSpecialPrice = messages.specialpriceInvalid;
    }

    return errors;
}

export default validate;
