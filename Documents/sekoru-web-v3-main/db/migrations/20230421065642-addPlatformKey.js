'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('SiteSettings', [{
      title: 'Platform secret key',
      name: 'platformSecretKey',
      value: 'JjQI:gHf+^=D',
      type: 'secret_settings',
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('SiteSettings', {
      name: {
        $in: ['platformSecretKey']
      }
    })
  }
};
