'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.sequelize.query("UPDATE `PaymentMethods` set paymentName='PayPal' WHERE id=1; "),
      
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.sequelize.query("UPDATE `PaymentMethods`set paymentName='Paypal' WHERE id=1; "),
      
    ])
  }
};
