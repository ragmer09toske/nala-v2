import messages from '../../../locale/messages';

const validate = values => {

  const errors = {}

  if (!values.title) {
    errors.title = messages.required;
  }

  if (!values.description) {
    errors.description = messages.required;
  }

  if (!values.buttonLabel) {
    errors.buttonLabel = messages.required;
  }

  if (!values.buttonLabel2) {
    errors.buttonLabel2 = messages.required;
  }

  if (!values.buttonLink1) {
    errors.buttonLink1 = messages.required;
  }

  if (!values.buttonLink2) {
    errors.buttonLink2 = messages.required;
  }

  return errors
}

export default validate