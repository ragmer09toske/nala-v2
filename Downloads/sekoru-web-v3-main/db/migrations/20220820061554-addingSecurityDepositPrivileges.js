'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.bulkInsert('Privileges', [
        {
          id: 20,
          privilege: 'Manage Security Deposit',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]),
      queryInterface.bulkInsert('PrivilegesURL', [
        {
          privilegeId: 20,
          permittedUrls: '/siteadmin/manage-security-deposit',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ])
    ])
  },

  async down(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.bulkDelete('Privileges', { id: 20 }),
      queryInterface.bulkDelete('PrivilegesURL', { privilegeId: 20 })
    ])
  }
};
