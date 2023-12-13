'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.bulkInsert('SiteSettings', [
      {
        title: "App Available Status",
        name: 'appAvailableStatus',
        value: 1,
        type: 'site_settings',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "PlayStore URL",
        name: 'playStoreUrl',
        value: 'https://play.google.com/store?hl=en',
        type: 'site_settings',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "AppStore URL",
        name: 'appStoreUrl',
        value: 'https://www.apple.com/ios/app-store/',
        type: 'site_settings',
        createdAt: new Date(),
        updatedAt: new Date()
      }])
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.bulkDelete('SiteSettings', {
        name: {
          $in: ['appAvailableStatus', 'playStoreUrl', 'appStoreUrl']
        }
      })
    ])
  }
};
