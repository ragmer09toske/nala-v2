'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.changeColumn('Transaction', 'paymentType', {
        type: Sequelize.ENUM('booking', 'cancellation', 'host', 'claimRefund'),
        defaultValue: 'booking'
      })
    ])
  },

  async down(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.changeColumn('Transaction', 'paymentType', {
        type: Sequelize.ENUM('booking', 'cancellation', 'host'),
        defaultValue: 'booking'
      })
    ])
  }
};
