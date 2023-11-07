import messages from '../../../locale/messages';

const validate = values => {

  const errors = {}

  if (!values.siteName) {
    errors.siteName = messages.required && messages.required;
  }

  if (!values.siteTitle) {
    errors.siteTitle = messages.required && messages.required;
  }

  if (values.metaDescription && values.metaDescription.length > 255) {
    errors.metaDescription = messages.metaDescription && messages.metaDescription;
  }

  if (values.metaKeyword && values.metaKeyword.length > 255) {
    errors.metaKeyword = messages.metaKeyword && messages.metaKeyword;
  }

  if ((!/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i.test(values.playStoreUrl))) {
    errors.playStoreUrl = messages.urlInvalid;
  }

  if ((!/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i.test(values.appStoreUrl))) {
    errors.appStoreUrl = messages.urlInvalid;
  }

  if (!values.email) {
    errors.email = messages.required && messages.required;
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/i.test(values.email)) {
    errors.email = messages.emailInvalid && messages.emailInvalid;
  }

  if (!values.phoneNumber) {
    errors.phoneNumber = messages.required && messages.required;
  } else if (values.phoneNumber && values.phoneNumber.trim() == "") {
    errors.phoneNumber = messages.required && messages.required;
  } else if (values.phoneNumber.length > 30) {
    errors.phoneNumber = messages.phoneNumberLengthInvalid;
  }

  if (!values.address) {
    errors.address = messages.required && messages.required;
  }

  if (!values.androidVersion || values.androidVersion.toString().trim() === '') {
    errors.androidVersion = messages.required;
  } else if (values.androidVersion && !/^\d+(\.\d+){0,2}$/i.test(values.androidVersion)) {
    errors.androidVersion = messages.invalid;
  }

  if (!values.iosVersion || values.iosVersion.trim() == '') {
    errors.iosVersion = messages.required
  } else if (values.iosVersion && !/^\d+(\.\d+){0,2}$/i.test(values.iosVersion)) {
    errors.iosVersion = messages.invalid;
  }


  return errors
}

export default validate;
