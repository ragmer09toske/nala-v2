require("dotenv").config();

/* eslint-disable max-len */

export const port = process.env.PORT || 3000;
export const host = process.env.WEBSITE_HOSTNAME || `localhost:${port}`;
export const url = process.env.WEBSITE_URL || "https://www.sekoru.com";
export const sitename = process.env.SITENAME || "Sekoru";
export const adminEmail = process.env.ADMIN_EMAIL || "support@sekoru.com";

export const adminEmaillist = ["core@sekoru.com"];

// Max File upload size in MB
export const maxUploadSize = 5;

// default locale is the first one
//export const locales = ["en-US", "es", "it-IT", "fr-FR", "pt-PT", "ar"];
export const locales = ["en-US"];

export const databaseUrl =
  process.env.DATABASE_URL || "mysql://sekoru-mysql-prod:Chang3d21@35.238.126.168/sekoru_app_v3_prod";

// Listing Photos Upload Directory
export const fileuploadDir = process.env.FILEUPLOAD_DIR || "./images/upload/";

// Logo upload directory
export const logouploadDir = process.env.LOGOUPLOAD_DIR || "./images/logo/";

// Home Logo upload directory
export const homelogouploadDir =
  process.env.LOGOUPLOAD_DIR || "./images/homeLogo/";

// Home page Banner upload directory
export const banneruploadDir =
  process.env.BANNER_UPLOAD_DIR || "./images/banner/";

// User Profile Photos Upload Directory
export const profilePhotouploadDir =
  process.env.PROFILE_PHOTO_UPLOAD_DIR || "./images/avatar/";

//Document Upload
export const documentuploadDir =
  process.env.FILEUPLOAD_DIR || "./images/document/";

// Location upload directory
export const locationuploadDir =
  process.env.LOGOUPLOAD_DIR || "./images/popularLocation/";

  
// Homepage images
export const homebanneruploadDir =
  process.env.HOME_BANNER_UPLOAD_DIR || "./images/home/";

export const claimImagesUploadDir = './images/claims/';

export const claimImageDir = './images/claims/';

export const faviconUploadDir = './images/favicon/';

export const whyHostUploadDir = './images/whyhost/';

export const analytics = {
  // https://analytics.google.com/
  google: {
    trackingId: process.env.GOOGLE_TRACKING_ID || "G-8T5LDY2H1X"
  }
};

export const googleMapAPI =
  process.env.GOOGLE_MAP_API || "AIzaSyAOyH0KslWPjER3Lts2bwdjMlaU2n5IYQo";
export const googleMapServerAPI = process.env.GOOGLE_MAP_SERVER_API;
export const serverKey = process.env.PUSH_NOTIFICATION_SERVER_KEY;
export const deepLinkBundleId = process.env.DEEP_LINK_BUNDLE_ID;

export const payment = {
  paypal: {
    email: process.env.PAYPAL_APP_EMAIL,
    clientId: process.env.PAYPAL_APP_CLIENT_ID,
    secret: process.env.PAYPAL_APP_SECRET,
    host: process.env.PAYPAL_HOST,
    hostMode: process.env.PAYPAL_MODE, // sandbox or live
    returnURL: `${url}${process.env.PAYPAL_RETURN_URL}`,
    cancelURL: `${url}${process.env.PAYPAL_CANCEL_URL}`,
    redirectURL: {
      success: `${url}${process.env.PAYPAL_SUCCESS_REDIRECT_URL}`,
      cancel: `${url}${process.env.PAYPAL_CANCEL_URL}`
    }
  },

  stripe: {
    secretKey: process.env.STRIPE_SECRET /* From ENV */,
    publishableKey:
      "pk_test_51IBbtWKZj84hsaYyzozZo7tsmlH7gIloiMLnNcfvOV7qen4UolNn2d2IYqRwQ038uAMi2P3saOhJR0Z7mvhaG2LF00WoVkhxw6"
  }
};

// site key for google recaptcha
export const googleCaptcha = {
  sitekey: "6LdWX0EaAAAAACqebpsEp6_PA12wVDPaI0Nu41Bq"
};

// SMS verification
export const sms = {
  twilio: {
    accountSid: process.env.TWILIO_ACCOUNTSID,
    authToken: process.env.TWILIO_AUTHTOKEN,
    phoneNumber: process.env.TWILIO_PHONENUMBER
  }
};

// Email Settings
export const emailConfig = {
  host: process.env.SMTP_HOST || "smtp-relay.gmail.com",
  port: process.env.SMTP_PORT || 587, // 25 or 587 for SendGrid
  email: process.env.SMTP_LOGIN_EMAIL,
  sender: process.env.SMTP_FROM_NAME || "support@sekoru.com",
  senderEmail: process.env.SMTP_SENDER_EMAIL || "support@sekoru.com",
  password: process.env.SMTP_LOGIN_PASSWORD,
  secure: process.env.SMTP_SECURE || false,
  tls: process.env.SMTP_TLS || true,
  name: process.env.SMTP_EHLO || "sekoru.com"
};

export const auth = {
  jwt: { secret: process.env.JWT_SECRET },

  redirectURL: {
    login: process.env.LOGIN_URL || "/dashboard",
    verification: process.env.LOGIN_URL || "/user/verification",
    userbanned: process.env.USER_BANNED_URL || "/userbanned",
    returnURLDeletedUser: process.env.DELETE_USER_URL || "/userbanned"
  },

  // https://developers.facebook.com/
  facebook: {
    //check
    id: process.env.FACEBOOK_APP_ID,
    secret: process.env.FACEBOOK_APP_SECRET,
    returnURL: process.env.FACEBOOK_CLIENT_URL || `${url}/login/facebook/return`
  },

  // https://cloud.google.com/console/project
  google: {
    id: process.env.GOOGLE_CLIENT_ID,
    secret: process.env.GOOGLE_CLIENT_SECRET,
    returnURL: process.env.GOOGLE_CLIENT_URL || `${url}/login/google/return`
  }
};
