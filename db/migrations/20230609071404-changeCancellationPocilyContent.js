'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.sequelize.query("UPDATE Cancellation SET policyContent = 'Cancel up to 1 week prior to arrival and get a 50% refund' WHERE id = 3 "),
      queryInterface.sequelize.query("UPDATE Cancellation SET policyContent = 'Cancel up to 5 days prior to arrival and get a 100% refund' WHERE id = 2 "),
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([

    ])
  }
};
