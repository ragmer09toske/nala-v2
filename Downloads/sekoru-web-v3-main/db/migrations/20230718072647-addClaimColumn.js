'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Reservation', 'isHostClaim', {
        type: Sequelize.BOOLEAN,
        defaultValue: 0
      }),
      queryInterface.addColumn('Reservation', 'claimRequestDate', {
        type: Sequelize.DATE
      }),
      queryInterface.addColumn('Reservation', 'claimPaymentAttempt', {
        type: Sequelize.INTEGER,
        defaultValue: 0
      })
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Reservation', 'isHostClaim'),
      queryInterface.removeColumn('Reservation', 'claimRequestDate'),
      queryInterface.removeColumn('Reservation', 'claimPaymentAttempt')
    ])
  }
};
