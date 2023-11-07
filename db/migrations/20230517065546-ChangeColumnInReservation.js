'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('Reservation', 'checkIn', {
        type: Sequelize.DATE,
        allowNull: false,
      }),
      queryInterface.changeColumn('Reservation', 'checkOut', {
        type: Sequelize.DATE,
        allowNull: false,
      })
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      
    ])
  }
};
