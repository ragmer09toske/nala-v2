'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.bulkInsert('PrivilegesURL', [
        {
          privilegeId: 1,
          permittedUrls: '/siteadmin/settings/config',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]),
      queryInterface.bulkInsert('SiteSettings', [
        {
          title: 'PushNotification Key',
          name: 'pushNotificationKey',
          value: 'AAAAK5aHG3c:APA91bG60ridFhKm7c4uAR-y_zON1wfhHpcgQWmbsU9byWDBky-7h-EEyulelmQq3CyQMOTuR347cmuXgxHruPKuU5THav1-UB440V5mRVbbfzLFZm34CB2APfDApkY7FagkrkZz796Q',
          type: 'config_settings',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: 'Deep link Bundle Id',
          name: 'deepLinkBundleId',
          value: 'XAQ5F75F7R.com.rs.RentALL',
          type: 'config_settings',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: 'Smtp Host',
          name: 'smtpHost',
          value: 'smtp.sendgrid.net',
          type: 'config_settings',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: 'Smtp Port',
          name: 'smtpPort',
          value: '587',
          type: 'config_settings',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: 'Smpt Email',
          name: 'smptEmail',
          value: 'apikey',
          type: 'config_settings',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: 'Smtp Sender',
          name: 'smtpSender',
          value: 'RentALL',
          type: 'config_settings',
          createdAt: new Date(),
          updatedAt: new Date()
        }, {
          title: 'Smtp Sender Email',
          name: 'smtpSenderEmail',
          value: 'admin@gmail.com',
          type: 'config_settings',
          createdAt: new Date(),
          updatedAt: new Date()
        }, {
          title: 'Smtp Password',
          name: 'smtpPassWord',
          value: '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',
          type: 'config_settings',
          createdAt: new Date(),
          updatedAt: new Date()
        }, {
          title: 'Twillio Accounts Id',
          name: 'twillioAccountSid',
          value: 'ACcd400137b32ab6a7243cc324929c51fd',
          type: 'config_settings',
          createdAt: new Date(),
          updatedAt: new Date()
        }, {
          title: 'Twillio Auth Token',
          name: 'twillioAuthToken',
          value: '599880fe92a1e012e74b7f1ceb036fe0',
          type: 'config_settings',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: 'Twillio Phonenumber',
          name: 'twillioPhone',
          value: '+15103984916',
          type: 'config_settings',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: 'Paypal Email',
          name: 'paypalEmail',
          value: 'redhoodcool-business@gmail.com',
          type: 'config_settings',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: 'Paypal Client Id',
          name: 'paypalClientId',
          value: 'Abax6FHO5FW8ausREpc182FX6Jwgq7ICYyUF6IBf_Pfi8-40CIXHMZL4l2TkMrVUznVG_2Q8yQLUb860',
          type: 'config_settings',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: 'Paypal Secret',
          name: 'paypalSecret',
          value: 'EG6BrUaD-nArhcjJT3CDzCPeM-ENANATVbsXvTC-y-CMIVCccjP0ehkIX6Q5Vh9wC2HRInzxRsPfyFQZ',
          type: 'config_settings',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: 'Paypal Host',
          name: 'paypalHost',
          value: 'api.sandbox.paypal.com',
          type: 'config_settings',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: 'Paypal Host Mode',
          name: 'paypalHostMode',
          value: 'sandbox',
          type: 'config_settings',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: 'Maximum image upload size',
          name: 'maxUploadSize',
          value: '10',
          type: 'site_settings',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: 'Facebook App Id',
          name: 'facebookAppId',
          value: 'Your Facebook App Id',
          type: 'config_settings',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: 'Facebook Secret Id',
          name: 'facebookSecretId',
          value: 'Your Facebook Secret Id',
          type: 'config_settings',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: 'Google Secret Id',
          name: 'googleSecretId',
          value: ' Your Google Secret Id',
          type: 'config_settings',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: 'Google Client Id',
          name: 'googleClientId',
          value: 'Your Google Client Id',
          type: 'config_settings',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: 'Facebook App Id',
          name: 'facebookAppId',
          value: 'Your Facebook App Id',
          type: 'config_settings',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: 'Facebook Secret Id',
          name: 'facebookSecretId',
          value: 'Your Facebook Secret Id',
          type: 'config_settings',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: 'Google Secret Id',
          name: 'googleSecretId',
          value: ' Your Google Secret Id',
          type: 'config_settings',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: 'Google Client Id',
          name: 'googleClientId',
          value: 'Your Google Client Id',
          type: 'config_settings',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: 'Force Update',
          name: 'appForceUpdate',
          value: 'false',
          type: 'appSettings',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: 'Android Version',
        name: 'androidVersion',
        value: null,
        type: 'appSettings',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: 'iOS Version',
          name: 'iosVersion',
          value: null,
          type: 'appSettings',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: 'Deep link JSON content',
          name: 'deepLinkContent',
          value: '[ { "relation": [ "delegate_permission/common.handle_all_urls" ], "target": { "namespace": "android_app", "package_name": "com.rentall.radicalstart", "sha256_cert_fingerprints": [ "74:47:9A:BF:3E:33:8D:50:EA:55:21:4A:5C:AB:78:EE:B7:90:DC:4A:52:32:BB:56:1F:11:21:11:C2:93:1A:94" ] } } ]',
          type: 'config_settings',
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ]),
      queryInterface.sequelize.query('UPDATE SiteSettings SET type ="config_settings" WHERE name = "stripePublishableKey";')
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.bulkDelete('SiteSettings', {
        name: {
          $in: ['appForceUpdate', 'androidVersion', 'iosVersion']
        }
      }),
      queryInterface.sequelize.query('UPDATE SiteSettings SET type ="site_settings" WHERE name = "stripePublishableKey";')
    ])
  }
};
