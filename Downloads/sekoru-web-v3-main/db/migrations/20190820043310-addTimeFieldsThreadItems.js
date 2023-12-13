'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('ThreadItems', 'startTime', {
        type: Sequelize.FLOAT
      }),
      queryInterface.addColumn('ThreadItems', 'endTime', {
        type: Sequelize.FLOAT
      }),
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('ThreadItems', 'startTime'),
      queryInterface.removeColumn('ThreadItems', 'endTime'),
    ])
  }
};
