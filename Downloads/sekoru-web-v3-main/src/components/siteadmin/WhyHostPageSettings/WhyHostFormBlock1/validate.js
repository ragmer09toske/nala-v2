import messages from '../../../../locale/messages';

const validate = values => {

  const errors = {}

  if (!values.hostBannerTitle1) {
    errors.hostBannerTitle1 = messages.required;
  } else if (values.hostBannerTitle1.trim() == "") {
    errors.hostBannerTitle1 = messages.required;
  } else if (values.hostBannerTitle1 && values.hostBannerTitle1.length > 200) {
    errors.hostBannerTitle1 = messages.exceedLimit;
  }

  if (!values.hostBannerContent1) {
    errors.hostBannerContent1 = messages.required;
  } else if (values.hostBannerContent1.trim() == "") {
    errors.hostBannerContent1 = messages.required;
  } else if (values.hostBannerContent1 && values.hostBannerContent1.length > 400) {
    errors.hostBannerContent1 = messages.exceedLimit;
  }

  if (!values.hostBannerContent2) {
    errors.hostBannerContent2 = messages.required;
  } else if (values.hostBannerContent2.trim() == "") {
    errors.hostBannerContent2 = messages.required;
  } else if (values.hostBannerContent2 && values.hostBannerContent2.length > 200) {
    errors.hostBannerContent2 = messages.exceedLimit;
  }

  return errors
}

export default validate;