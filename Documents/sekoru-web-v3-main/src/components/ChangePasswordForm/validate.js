import messages from '../../locale/messages';

const validate = values => {

  const errors = {}

  if (!values.oldPassword && values.registeredType === 'email') {
    errors.oldPassword = messages.required;
  } else if (values.oldPassword && /\s/.test(values.oldPassword)) {
    errors.oldPassword = messages.invalidPasswordSpace;
  }

  if (!values.newPassword) {
    errors.newPassword = messages.required;
  } else if (values.newPassword && /\s/.test(values.newPassword)) {
    errors.newPassword = messages.invalidPasswordSpace;
  } else if (values.newPassword.length < 8) {
    errors.newPassword = messages.passwordError3;
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = messages.required;
  } else if (values.confirmPassword && /\s/.test(values.confirmPassword)) {
    errors.confirmPassword = messages.invalidPasswordSpace;
  } else if (values.confirmPassword.length < 8) {
    errors.confirmPassword = messages.passwordError5;
  }

  return errors
}

export default validate