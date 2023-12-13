
// The top-level (parent) route
export default {

  path: '',

  // Keep in mind, routes are evaluated in order
  children: [
    {
      path: '/',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./home'));
        reject(error);
      }),
    },
    {
      path: '/contact',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./contact'));
        reject(error);
      }),
    },
    {
      path: '/login',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./login'));
        reject(error);
      }),
    },
    {
      path: '/register',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./register'));
        reject(error);
      }),
    },
    {
      path: '/user/edit',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./editProfile'));
        reject(error);
      }),
    },
    {
      path: '/admin',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./admin'));
        reject(error);
      }),
    },
    {
      path: '/users/show/:profileId?',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./profile'));
        reject(error);
      }),
    },
    {
      path: '/become-a-owner/:listId?/:formPage?',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./becomeHost'));
        reject(error);
      }),
    },
    {
      path: '/cars/:listId/:preview?',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./viewListing'));
        reject(error);
      }),
    },
    {
      path: '/cars',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./manageListing'));
        reject(error);
      }),
    },
    {
      path: '/s',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./search'));
        reject(error);
      }),
    },
    // {
    //   path: '/user/photo',
    //   load: () => new Promise((resolve, reject) => {
    //     resolve(require('./profilePhoto'));
    //     reject(error);
    //   }),
    // },
    {
      path: '/user/verification',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./trustAndVerification'));
        reject(error);
      }),
    },
    {
      path: '/users/security',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./changePassword'));
        reject(error);
      }),
    },
    {
      path: '/dashboard',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./dashboard'));
        reject(error);
      }),
    },
    {
      path: '/inbox',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./inbox'));
        reject(error);
      }),
    }, {
      path: '/message/:threadId/:type',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./viewMessage'));
        reject(error);
      }),
    },
    {
      path: '/book/:hostingId',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./book'));
        reject(error);
      }),
    },
    {
      path: '/user/payout',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./payout'));
        reject(error);
      }),
    },
    {
      path: '/user/addpayout',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./addPayout'));
        reject(error);
      }),
    },
    {
      path: '/payment/:reservationId',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./payment'));
        reject(error);
      }),
    },
    {
      path: '/users/trips/itinerary/:reservationId',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./itinerary'));
        reject(error);
      }),
    },
    {
      path: '/users/trips/receipt/:reservationId',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./receipt'));
        reject(error);
      }),
    },
    {
      path: '/reservation/:type',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./reservation'));
        reject(error);
      }),
    },
    {
      path: '/trips/:type',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./trips'));
        reject(error);
      }),
    },
    {
      path: '/user/transaction/:type',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./transaction'));
        reject(error);
      }),
    },
    {
      path: '/warning',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./warning'));
        reject(error);
      }),
    },
    {
      path: '/cancel/:reservationId/:type',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./cancel'));
        reject(error);
      }),
    },
    {
      path: '/cancellation-policies/:type?',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./cancellationPolicies'));
        reject(error);
      }),
    },
    {
      path: '/user/reviews/:type?',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./reviews'));
        reject(error);
      }),
    },
    {
      path: '/review/write/:reservationId',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./writeReview'));
        reject(error);
      }),
    },
    {
      path: '/password/verification',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./passwordVerification'));
        reject(error);
      }),
    },
    {
      path: '/userbanned',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./userbanned'));
        reject(error);
      }),
    },
    {
      path: '/user/payout/failure',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./addPayoutFailure'));
        reject(error);
      }),
    },
    {
      path: '/document-verification',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./documentVerification'));
        reject(error);
      }),
    },
    {
      path: '/siteadmin/content-management',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./siteadmin/blogManagement'));
        reject(error);
      }),
    },
    {
      path: '/siteadmin/page/add',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./siteadmin/addBlogDetails'));
        reject(error);
      }),
    },
    {
      path: '/siteadmin/edit/page/:blogId',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./siteadmin/editBlogDetails'));
        reject(error);
      }),
    },
    {
      path: '/page/:u1?',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./blog'));
        reject(error);
      }),
    },
    {
      path: '/about',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./static/about'));
        reject(error);
      }),
    },
    {
      path: '/privacy',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./static/privacy'));
        reject(error);
      }),
    },
    {
      path: '/careers',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./static/careers'));
        reject(error);
      }),
    },
    {
      path: '/press',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./static/press'));
        reject(error);
      }),
    },
    {
      path: '/policies',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./static/policies'));
        reject(error);
      }),
    },
    {
      path: '/help',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./static/help'));
        reject(error);
      }),
    },
    {
      path: '/safety',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./static/trustAndSafety'));
        reject(error);
      }),
    },
    {
      path: '/travel',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./static/travelCredit'));
        reject(error);
      }),
    },
    {
      path: '/citizen',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./static/citizen'));
        reject(error);
      }),
    },
    {
      path: '/business',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./static/business'));
        reject(error);
      }),
    },
    {
      path: '/guide',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./static/guide'));
        reject(error);
      }),
    },
    {
      path: '/whyhost-old',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./static/whyhost'));
        reject(error);
      }),
    },
    {
      path: '/why-become-owner',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./whyhostnew'));
        reject(error);
      }),
    },
    {
      path: '/responsible-hosting',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./static/responsible-hosting'));
        reject(error);
      }),
    },
    {
      path: '/hospitality',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./static/hospitality'));
        reject(error);
      }),
    },
    {
      path: '/siteadmin',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./siteadmin/adminDashboard'));
        reject(error);
      }),
    },
    {
      path: '/siteadmin/login',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./siteadmin/adminLogin'));
        reject(error);
      }),
    },
    {
      path: '/siteadmin/change/admin',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./siteadmin/changeAdmin'));
        reject(error);
      }),
    },
    {
      path: '/siteadmin/users',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./siteadmin/users'));
        reject(error);
      }),
    },
    {
      path: '/siteadmin/settings/site',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./siteadmin/siteSettings'));
        reject(error);
      }),
    },
    {
      path: '/siteadmin/listsettings/:typeId',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./siteadmin/listSettings'));
        reject(error);
      }),
    },
    {
      path: '/siteadmin/listings',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./siteadmin/listings'));
        reject(error);
      }),
    },
    {
      path: '/siteadmin/currency',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./siteadmin/currencies'));
        reject(error);
      }),
    },
    {
      path: '/siteadmin/settings/payment',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./siteadmin/paymentSettings'));
        reject(error);
      }),
    },
    {
      path: '/siteadmin/settings/search',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./siteadmin/searchSettings'));
        reject(error);
      }),
    },
    {
      path: '/siteadmin/home/caption',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./siteadmin/bannerSettings'));
        reject(error);
      }),
    },
    {
      path: '/siteadmin/home/banner',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./siteadmin/imageBanner'));
        reject(error);
      }),
    },
    {
      path: '/siteadmin/reservations',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./siteadmin/reservations'));
        reject(error);
      }),
    },
    {
      path: '/siteadmin/receipt/:reservationId',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./siteadmin/viewReceipt'));
        reject(error);
      }),
    },
    {
      path: '/siteadmin/settings/servicefees',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./siteadmin/serviceFeesSettings'));
        reject(error);
      }),
    },
    {
      path: '/siteadmin/reviews',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./siteadmin/adminReviews'));
        reject(error);
      }),
    },
    {
      path: '/siteadmin/write-reviews',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./siteadmin/writeReview'));
        reject(error);
      }),
    },
    {
      path: '/siteadmin/edit-review/:reviewId',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./siteadmin/editReview'));
        reject(error);
      }),
    },
    {
      path: '/siteadmin/viewreservation/:id/:type',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./siteadmin/viewreservation'));
        reject(error);
      }),
    },
    {
      path: '/siteadmin/home/footer-block',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./siteadmin/footerBlock'));
        reject(error);
      }),
    },
    {
      path: '/siteadmin/messages',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./siteadmin/messages'));
        reject(error);
      }),
    },
    {
      path: '/siteadmin/reportUser',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./siteadmin/reportUser'));
        reject(error);
      }),
    },
    {
      path: '/siteadmin/popularlocation',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./siteadmin/popularLocation'));
        reject(error);
      }),
    },
    {
      path: '/siteadmin/edit/popularlocation/:locationId',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./siteadmin/editPopularLocation'));
        reject(error);
      }),
    },
    {
      path: '/siteadmin/popularlocation/add',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./siteadmin/addPopularLocation'));
        reject(error);
      }),
    },
    {
      path: '/siteadmin/staticpage/management',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./siteadmin/staticPage'));
        reject(error);
      }),
    },
    {
      path: '/siteadmin/edit/staticpage/:pageId',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./siteadmin/editStaticPage'));
        reject(error);
      }),
    },
    {
      path: '/siteadmin/viewpayout/:id/:type',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./siteadmin/viewPayout'));
        reject(error);
      }),
    },
    {
      path: '/siteadmin/profileView/:profileId?',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./siteadmin/profileView'));
        reject(error);
      }),
    },
    {
      path: '/siteadmin/document',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./siteadmin/document'));
        reject(error);
      }),
    },
    {
      path: '/siteadmin/user-reviews',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./siteadmin/userReviews'));
        reject(error);
      }),
    },
    {
      path: '/siteadmin/management-reviews/:reviewId',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./siteadmin/userEditReviews'));
        reject(error);
      }),
    },
    {
      path: '/siteadmin/home/static-info-block',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./siteadmin/staticBlock'));
        reject(error);
      }),
    },
    {
      path: '/siteadmin/whyHost/Block1',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./siteadmin/whyHostPageSettings/whyHostBlock1'));
        reject(error);
      }),
    },
    {
      path: '/siteadmin/whyHost/Block2',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./siteadmin/whyHostPageSettings/whyHostBlock2'));
        reject(error);
      }),
    },
    {
      path: '/siteadmin/whyHost/Block3',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./siteadmin/whyHostPageSettings/whyHostBlock3'));
        reject(error);
      }),
    },
    {
      path: '/siteadmin/whyHost/Block4',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./siteadmin/whyHostPageSettings/whyHostBlock4'));
        reject(error);
      }),
    },
    {
      path: '/siteadmin/whyHost/Block5',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./siteadmin/whyHostPageSettings/whyHostBlock5'));
        reject(error);
      }),
    },
    {
      path: '/siteadmin/whyHost/Block7',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./siteadmin/whyHostPageSettings/whyHostBlock6'));
        reject(error);
      }),
    },
    {
      path: '/siteadmin/whyHost/review',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./siteadmin/whyHostPageSettings/adminReviews'));
        reject(error);
      }),
    },
    {
      path: '/siteadmin/whyHost/review/edit/:id',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./siteadmin/whyHostPageSettings/editReviews'));
        reject(error);
      }),
    },
    {
      path: '/siteadmin/whyHost/review/add',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./siteadmin/whyHostPageSettings/addReviews'));
        reject(error);
      }),
    },
    {
      path: '/siteadmin/payout',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./siteadmin/managePayout'));
        reject(error);
      }),
    },
    {
      path: '/siteadmin/failed-payout/:id',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./siteadmin/failedPayout'));
        reject(error);
      }),
    },
    {
      path: '/siteadmin/payment-gateway-section',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./siteadmin/paymentGateway'));
        reject(error);
      }),
    },
    {
      path: '/siteadmin/admin-roles',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./siteadmin/adminRoles'));
        reject(error);
      }),
    },
    {
      path: '/siteadmin/admin-users',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./siteadmin/adminUser'));
        reject(error);
      }),
    },
    {
      path: '/wishlists/:id?',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./wishLists'));
        reject(error);
      }),
    },
    {
      path: '/siteadmin/manage-security-deposit',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./siteadmin/manageSecurityDeposit'));
        reject(error);
      }),
    },
    {
      path: '/siteadmin/home/find-your-car',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./siteadmin/findYourVehicleBlock'));
        reject(error);
      }),
    },
    {
      path: '/siteadmin/settings/config',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./siteadmin/configSettings'));
        reject(error);
      }),
    },
    {
      path: '/siteadmin/why-host',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./siteadmin/whyHost'));
        reject(error);
      }),
    },
    {
      path: '(.*)',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./notFound'));
        reject(error);
      }),
    },

  ],

  async action({ next }) {
    // Execute each child route until one of them return the result
    let route = await next();
    // Provide default values for title, description etc.
    route.title = `${route.title || 'Untitled Page'}`;
    route.description = route.description || '';
    return route;
  },

};
