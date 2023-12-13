'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Reservation', 'licenseNumber', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('Reservation', 'firstName', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('Reservation', 'middleName', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('Reservation', 'lastName', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('Reservation', 'dateOfBirth', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('Reservation', 'countryCode', {
        type: Sequelize.STRING
      })
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Reservation', 'licenseNumber'),
      queryInterface.removeColumn('Reservation', 'firstName'),
      queryInterface.removeColumn('Reservation', 'middleName'),
      queryInterface.removeColumn('Reservation', 'lastName'),
      queryInterface.removeColumn('Reservation', 'dateOfBirth'),
      queryInterface.removeColumn('Reservation', 'countryCode'),
    ])
  }
};