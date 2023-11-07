'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Reservation', 'startTime', {
        type: Sequelize.FLOAT
      }),
      queryInterface.addColumn('Reservation', 'endTime', {
        type: Sequelize.FLOAT
      }),
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Reservation', 'startTime'),
      queryInterface.removeColumn('Reservation', 'endTime'),
    ])
  }
};
