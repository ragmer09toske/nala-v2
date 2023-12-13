import messages from '../../../../locale/messages';

const validate = values => {

  const errors = {}

  if (!values.easyHostTitle1) {
    errors.easyHostTitle1 = messages.required;
  } else if (values.easyHostTitle1.trim() == "") {
    errors.easyHostTitle1 = messages.required;
  } else if (values.easyHostTitle1 && values.easyHostTitle1.length > 200) {
    errors.easyHostTitle1 = messages.exceedLimit;
  }

  if (!values.easyHostContent1) {
    errors.easyHostContent1 = messages.required;
  } else if (values.easyHostContent1.trim() == "") {
    errors.easyHostContent1 = messages.required;
  } else if (values.easyHostContent1 && values.easyHostContent1.length > 400) {
    errors.easyHostContent1 = messages.exceedLimit;
  }

  if (!values.easyHostContent2) {
    errors.easyHostContent2 = messages.required;
  } else if (values.easyHostContent2.trim() == "") {
    errors.easyHostContent2 = messages.required;
  } else if (values.easyHostContent2 && values.easyHostContent2.length > 400) {
    errors.easyHostContent2 = messages.exceedLimit;
  }

  if (!values.workTitle1) {
    errors.workTitle1 = messages.required;
  } else if (values.workTitle1.trim() == "") {
    errors.workTitle1 = messages.required;
  } else if (values.workTitle1 && values.workTitle1.length > 200) {
    errors.workTitle1 = messages.exceedLimit;
  }

  if (!values.workTitle2) {
    errors.workTitle2 = messages.required;
  } else if (values.workTitle2.trim() == "") {
    errors.workTitle2 = messages.required;
  } else if (values.workTitle2 && values.workTitle2.length > 200) {
    errors.workTitle2 = messages.exceedLimit;
  }

  if (!values.workContent1) {
    errors.workContent1 = messages.required;
  } else if (values.workContent1.trim() == "") {
    errors.workContent1 = messages.required;
  } else if (values.workContent1 && values.workContent1.length > 400) {
    errors.workContent1 = messages.exceedLimit;
  }

  if (!values.workContent2) {
    errors.workContent2 = messages.required;
  } else if (values.workContent2.trim() == "") {
    errors.workContent2 = messages.required;
  } else if (values.workContent2 && values.workContent2.length > 400) {
    errors.workContent2 = messages.exceedLimit;
  }

  return errors
}

export default validate;