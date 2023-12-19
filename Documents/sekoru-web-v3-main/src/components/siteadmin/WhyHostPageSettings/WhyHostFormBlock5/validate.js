import messages from '../../../../locale/messages';

const validate = values => {

  const errors = {}

  if (!values.workTitleHeading) {
    errors.workTitleHeading = messages.required;
  } else if (values.workTitleHeading.trim() == "") {
    errors.workTitleHeading = messages.required;
  } else if (values.workTitleHeading && values.workTitleHeading.length > 200) {
    errors.workTitleHeading = messages.exceedLimit;
  }


  if (!values.peaceTitle1) {
    errors.peaceTitle1 = messages.required;
  } else if (values.peaceTitle1.trim() == "") {
    errors.peaceTitle1 = messages.required;
  } else if (values.peaceTitle1 && values.peaceTitle1.length > 200) {
    errors.peaceTitle1 = messages.exceedLimit;
  }

  if (!values.peaceTitle2) {
    errors.peaceTitle2 = messages.required;
  } else if (values.peaceTitle2.trim() == "") {
    errors.peaceTitle2 = messages.required;
  } else if (values.peaceTitle2 && values.peaceTitle2.length > 200) {
    errors.peaceTitle2 = messages.exceedLimit;
  }

  if (!values.peaceContent1) {
    errors.peaceContent1 = messages.required;
  } else if (values.peaceContent1.trim() == "") {
    errors.peaceContent1 = messages.required;
  } else if (values.peaceContent1 && values.peaceContent1.length > 400) {
    errors.peaceContent1 = messages.exceedLimit;
  }

  if (!values.peaceContent2) {
    errors.peaceContent2 = messages.required;
  } else if (values.peaceContent2.trim() == "") {
    errors.peaceContent2 = messages.required;
  } else if (values.peaceContent2 && values.peaceContent2.length > 400) {
    errors.peaceContent2 = messages.exceedLimit;
  }


  return errors
}

export default validate;