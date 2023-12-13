'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.sequelize.query("UPDATE PaymentMethods SET name = 'PayPal' WHERE id = 1;"),
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
     
    ])
  }
};
