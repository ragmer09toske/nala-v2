'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.bulkInsert('PrivilegesURL', [
        {
          privilegeId: 9,
          permittedUrls: '/message/',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ])
    ])
  },

  down: (queryInterface, Sequelize) => {
    
  }
};