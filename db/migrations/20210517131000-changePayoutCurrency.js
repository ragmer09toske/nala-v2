'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.sequelize.query("UPDATE `PaymentMethods` set currency='EUR' WHERE id=2; "),
      
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.sequelize.query("UPDATE `PaymentMethods`set currency='EUR' WHERE id=2; "),
      
    ])
  }
};
