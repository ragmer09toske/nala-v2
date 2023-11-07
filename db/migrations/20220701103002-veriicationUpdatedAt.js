'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('UserProfile', 'codeUpdatedAt', {
        type: Sequelize.DATE,
      })
    ])
  },

  down: (queryInterface, Sequelize) => {

  }
};
