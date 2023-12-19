'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.bulkInsert('SiteSettings', [{
        title: 'Home Page Logo Height',
        name: 'homePageLogoHeight',
        value: '100',
        type: 'site_settings',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        title: 'Home Page Logo Width',
        name: 'homePageLogoWidth',
        value: '100',
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
          $in: ['homePageLogoHeight', 'homePageLogoWidth']
        }
      })
    ])
  }
};
