'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('SiteSettings', [{
      title: 'Stripe Publishable Key',
      name: 'stripePublishableKey',
      value: 'pk_test_C5ukBJM7qr5P1F8dY4XKhdyp',
      type: 'site_settings',
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('SiteSettings', {
      name: {
        $in: ['stripePublishableKey']
      }
    })
  }
};
