'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.bulkInsert('SiteSettings', [{
        title: 'Email Logo',
        name: 'emailLogo',
        value: null,
        type: 'site_settings',
        createdAt: new Date(),
        updatedAt: new Date()
      }]),
      queryInterface.bulkInsert('SiteSettings', [{
        title: 'Favicon Logo',
        name: 'faviconLogo',
        value: '3b8e5dee4415efd0663e848509e87560.png',
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
          $in: ['faviconLogo', 'emailLogo']
        }
      })
     ])
  }
};
