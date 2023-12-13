'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.bulkInsert('PrivilegesURL', [
        {
          privilegeId: 15,
          permittedUrls: '/siteadmin/home/find-your-car',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ])
    ])
  },

  async down(queryInterface, Sequelize) {
   
  }
};
