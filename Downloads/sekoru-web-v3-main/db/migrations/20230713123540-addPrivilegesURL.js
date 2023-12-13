'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.bulkInsert('PrivilegesURL', [
        {
          privilegeId: 16,
          permittedUrls: '/siteadmin/whyHost/Block7',
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ])
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('PrivilegesURL', {
      privilegeId: {
        ne: null
      }
    })
  }
};