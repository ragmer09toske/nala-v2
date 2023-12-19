'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.renameTable('FindYourCarBlock', 'FindYourVehicleBlock')
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([])
  }
};
