'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.bulkInsert('Privileges', [
        {
          privilege: 'Manage Site Settings',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          privilege: 'Manage Users',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          privilege: 'Manage Cars',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          privilege: 'Manage Reservations',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          privilege: 'Manage Reviews',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          privilege: 'Manage Admin Reviews',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          privilege: 'Manage Service Fee',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          privilege: 'Manage Document Verification',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          privilege: 'Manage Messages',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          privilege: 'Manage Report',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          privilege: 'Manage Payout',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          privilege: 'Manage Payment Gateway',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          privilege: 'Manage Currency',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          privilege: 'Manage Search Settings',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          privilege: 'Manage Home Page Settings',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          privilege: 'Manage Why Become Owner Page',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          privilege: 'Manage Car Settings',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          privilege: 'Manage Content',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          privilege: 'Manage Static Content',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ])
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Privileges', {
      privilege: {
        ne: null
      }
    })
  }
};