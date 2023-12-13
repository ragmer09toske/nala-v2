'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.sequelize.query("UPDATE `PaymentMethods` set paymentName='Paypal' WHERE id=1; "),
      queryInterface.sequelize.query("UPDATE `PaymentMethods`set paymentName='Stripe' WHERE id=2; ")
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.sequelize.query("UPDATE `PaymentMethods`set paymentName='' WHERE id=1; "),
      queryInterface.sequelize.query("UPDATE `PaymentMethods`set paymentName='' WHERE id=2; ")
    ])
  }
};
