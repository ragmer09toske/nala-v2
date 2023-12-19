import messages from '../../../../locale/messages';

const validate = values => {

  const errors = {}

  if (!values.peaceTitleHeading) {
    errors.peaceTitleHeading = messages.required;
  } else if (values.peaceTitleHeading.trim() == "") {
    errors.peaceTitleHeading = messages.required;
  } else if (values.peaceTitleHeading && values.peaceTitleHeading.length > 200) {
    errors.peaceTitleHeading = messages.exceedLimit;
  }

  if (!values.peaceTitle3) {
    errors.peaceTitle3 = messages.required;
  } else if (values.peaceTitle3.trim() == "") {
    errors.peaceTitle3 = messages.required;
  } else if (values.peaceTitle3 && values.peaceTitle3.length > 200) {
    errors.peaceTitle3 = messages.exceedLimit;
  }

  if (!values.peaceContent3) {
    errors.peaceContent3 = messages.required;
  } else if (values.peaceContent3.trim() == "") {
    errors.peaceContent3 = messages.required;
  } else if (values.peaceContent3 && values.peaceContent3.length > 400) {
    errors.peaceContent3 = messages.exceedLimit;
  }

  return errors
}

export default validate;