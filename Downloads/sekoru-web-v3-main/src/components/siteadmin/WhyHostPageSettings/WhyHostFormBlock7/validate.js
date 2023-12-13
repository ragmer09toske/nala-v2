import messages from '../../../../locale/messages';

const validate = values => {

  const errors = {}

  if (!values.userName) {
    errors.userName = messages.required;
  } else if (values.userName.trim() == "") {
    errors.userName = messages.required;
  }

  if (!values.reviewContent) {
    errors.reviewContent = messages.required;
  } else if (values.reviewContent.trim() == "") {
    errors.reviewContent = messages.required;
  }

  return errors
}

export default validate;