import messages from '../../locale/messages';


const validate = values => {

  const errors = {}

  if (!values.make) {
    errors.make = messages.required;
  }

  if (!values.model) {
    errors.model = messages.required;
  }

  if (!values.year) {
    errors.year = messages.required;
  }

  if (!values.carType) {
    errors.carType = messages.required;
  }

  if (!values.odometer) {
    errors.odometer = messages.required;
  }

  if (!values.transmission) {
    errors.transmission = messages.required;
  }

  if (!values.country || values.country.toString().trim() == "") {
    errors.country = messages.required;
  }

  if (!values.state || values.state.toString().trim() == "") {
    errors.state = messages.required;
  }

  if (!values.city || values.city.toString().trim() == "") {
    errors.city = messages.required;
  }

  if (!values.street || values.street.toString().trim() == "") {
    errors.street = messages.required;
  }

  if (values.zipcode && values.zipcode.toString().trim() == "") {
    errors.zipcode = messages.required;
  }

  return errors
}

export default validate
