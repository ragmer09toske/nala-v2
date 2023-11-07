'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.sequelize.query("Truncate table StaticPage"),

    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
    ])
  }
};