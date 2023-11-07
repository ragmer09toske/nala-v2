import messages from '../../../locale/messages';

const validate = values => {

    const errors = {}

    if (!values.minPrice || values.minPrice <= 0) {
        errors.minPrice = messages.required;
    }

    if (isNaN(values.minPrice) || (parseInt(values.minPrice, 10) < 0)) {
        errors.minPrice = messages.onlyNumericKey;
    }

    if (isNaN(values.maxPrice) || (parseInt(values.maxPrice, 10) < 0)) {
        errors.maxPrice = messages.onlyNumericKey;
    }

    if (!values.maxPrice || values.maxPrice <= 0) {
        errors.maxPrice = messages.required;
    } else if (values.minPrice >= values.maxPrice) {
        errors.maxPrice = messages.maxPriceError;
    }



    return errors
}

export default validate;