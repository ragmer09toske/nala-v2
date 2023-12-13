'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('PaymentMethods', 'paymentName', {
      type: Sequelize.STRING,
      allowNull: false
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('PaymentMethods', 'paymentName')
  }
};
