'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('Reservation', 'claimReason', {
        type: Sequelize.TEXT('long')
      }),
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([ queryInterface.removeColumn('Reservation', 'claimReason'),])
  }
};
