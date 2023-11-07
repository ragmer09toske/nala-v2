'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.sequelize.query('UPDATE Listing SET lastUpdatedAt = NOW() WHERE 1=1;')
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.sequelize.query('UPDATE Listing SET lastUpdatedAt = NOW() WHERE 1=1')
    ])
  }
};
