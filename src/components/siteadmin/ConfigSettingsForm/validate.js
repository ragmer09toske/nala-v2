import messages from '../../../locale/messages';

const validate = values => {

  const errors = {}

  if (!values.deepLinkBundleId || values.deepLinkBundleId.toString().trim() == "") {
    errors.deepLinkBundleId = messages.required;
  }

  if (!values.smtpHost || values.smtpHost.toString().trim() == "") {
    errors.smtpHost = messages.required;
  }

  if (!values.smtpPort || values.smtpPort.toString().trim() == "") {
    errors.smtpPort = messages.required;
  }

  if (!values.smptEmail || values.smptEmail.toString().trim() == "") {
    errors.smptEmail = messages.required && messages.required;
  }

  if (!values.smtpSender || values.smtpSender.toString().trim() == "") {
    errors.smtpSender = messages.required;
  }

  if (!values.smtpPassWord || values.smtpPassWord.toString().trim() == "") {
    errors.smtpPassWord = messages.required;
  }


  if (!values.smtpSenderEmail) {
    errors.smtpSenderEmail = messages.required && messages.required;
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/i.test(values.smtpSenderEmail)) {
    errors.smtpSenderEmail = messages.emailInvalid && messages.emailInvalid;
  }

  if (!values.twillioAccountSid || values.twillioAccountSid.toString().trim() == "") {
    errors.twillioAccountSid = messages.required;
  }

  if (!values.twillioAuthToken || values.twillioAuthToken.toString().trim() == "") {
    errors.twillioAuthToken = messages.required;
  }

  if (!values.twillioPhone || values.twillioPhone && values.twillioPhone.toString().trim() == "") {
    errors.twillioPhone = messages.required && messages.required;
  } else if (values.twillioPhone.length > 30) {
    errors.twillioPhone = messages.phoneNumberLengthInvalid;
  }

  if (!values.paypalEmail) {
    errors.paypalEmail = messages.required && messages.required;
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/i.test(values.paypalEmail)) {
    errors.paypalEmail = messages.emailInvalid && messages.emailInvalid;
  }

  if (!values.paypalClientId || values.paypalClientId.toString().trim() == "") {
    errors.paypalClientId = messages.required;
  }

  if (!values.paypalSecret || values.paypalSecret.toString().trim() == "") {
    errors.paypalSecret = messages.required;
  }

  if (!values.paypalHost || values.paypalHost.toString().trim() == "") {
    errors.paypalHost = messages.required;
  }

  if (!values.paypalHostMode) {
    errors.paypalHostMode = messages.required;
  }

  if (!values.stripePublishableKey || values.stripePublishableKey.toString().trim() == "") {
    errors.stripePublishableKey = messages.required;
  }

  if (!values.maxUploadSize || values.maxUploadSize.toString().trim() == "") {
    errors.maxUploadSize = messages.required;
  }

  if (!values.deepLinkContent || values.deepLinkContent.toString().trim() == "") {
    errors.deepLinkContent = messages.required;
  }

  if (!values.facebookAppId || values.facebookAppId.toString().trim() == "") {
    errors.facebookAppId = messages.required;
  }
  if (!values.facebookSecretId || values.facebookSecretId.toString().trim() == "") {
    errors.facebookSecretId = messages.required;
  }

  if (!values.googleClientId || values.googleClientId.toString().trim() == "") {
    errors.googleClientId = messages.required;
  }

  if (!values.googleSecretId || values.googleSecretId.toString().trim() == "") {
    errors.googleSecretId = messages.required;
  }

  if (!values.fcmPushNotificationKey || values.fcmPushNotificationKey.toString().trim() == "") {
    errors.fcmPushNotificationKey = messages.required;
  }

  return errors;
}

export default validate;
