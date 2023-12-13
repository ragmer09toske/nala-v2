require('dotenv').config();

/* eslint-disable max-len */

export const port = process.env.PORT || 3000;
export const host = process.env.WEBSITE_HOSTNAME || `localhost:${port}`;
export const url = 'http://localhost:3001';
export const sitename = 'Your Website Name';

// default locale is the first one
export const locales = ['en-US', 'es', 'it-IT', 'fr-FR', 'pt-PT', 'ar'];

export const databaseUrl = process.env.DATABASE_URL;

// Listing Photos Upload Directory
export const fileuploadDir = './images/upload/';

// Logo upload directory
export const logouploadDir = './images/logo/';

// Home Logo upload directory
export const homelogouploadDir = './images/homeLogo/';

// Home page Banner upload directory
export const banneruploadDir = './images/banner/';

// User Profile Photos Upload Directory
export const profilePhotouploadDir = './images/avatar/';

//Document Upload
export const documentuploadDir = './images/document/';

// Location upload directory
export const locationuploadDir = './images/popularLocation/';

// Homepage images
export const homebanneruploadDir = './images/home/';

export const claimImagesUploadDir = './images/claims/';

export const claimImageDir = '/images/claims/';

export const faviconUploadDir = './images/favicon/';

export const whyHostUploadDir = './images/whyhost/';

export const analytics = {
  // https://analytics.google.com/
  google: {
    trackingId: 'UA-XXXXX-X',
  },
};

export const googleMapAPI = '<Your API Key>';
export const googleMapServerAPI = process.env.GOOGLE_MAP_SERVER_API;

export const payment = {

  paypal: {
    returnURL: `${url}${process.env.PAYPAL_RETURN_URL}`,
    cancelURL: `${url}${process.env.PAYPAL_CANCEL_URL}`,
    redirectURL: {
      success: `${url}${process.env.PAYPAL_SUCCESS_REDIRECT_URL}`,
      cancel: `${url}${process.env.PAYPAL_CANCEL_URL}`
    },
  },

  stripe: {
    secretKey: process.env.STRIPE_SECRET, /* From ENV */
    publishableKey: 'pk_test_C5ukBJM7qr5P1F8dY4XKhdyp'
  }

};

// site key for google recaptcha
export const googleCaptcha = {
  sitekey: '<Your Site key>'
};

export const auth = {
  jwt: { secret: process.env.JWT_SECRET },

  redirectURL: {
    login: process.env.LOGIN_URL || '/dashboard',
    verification: process.env.LOGIN_URL || '/user/verification',
    userbanned: process.env.USER_BANNED_URL || '/userbanned',
    returnURLDeletedUser: process.env.DELETE_USER_URL || '/userbanned'
  },

  // https://developers.facebook.com/ IT IS REMOVED ON THE FUNCTIONING CODE. 
  facebook: {
    returnURL: process.env.FACEBOOK_CLIENT_URL || `${url}/login/facebook/return`,
  },

  // https://cloud.google.com/console/project
  google: {
    returnURL: process.env.GOOGLE_CLIENT_URL || `${url}/login/google/return`,
  }
};
