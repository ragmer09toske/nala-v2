'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all[
      queryInterface.changeColumn('ListingData', 'basePrice', {
        type: Sequelize.DOUBLE
      })
    ]
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all[
      queryInterface.changeColumn('ListingData', 'basePrice',{
        type: Sequelize.FLOAT
      })
    ]
  }
};