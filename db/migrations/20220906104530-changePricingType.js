'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all[
      queryInterface.changeColumn('ListingData', 'delivery', {
        type: Sequelize.DOUBLE
      }),
      queryInterface.changeColumn('ListingData', 'securityDeposit', {
        type: Sequelize.DOUBLE
      }),
      queryInterface.changeColumn('ListBlockedDates', 'isSpecialPrice', {
        type: Sequelize.DOUBLE
      })
    ]
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all[
      queryInterface.changeColumn('ListingData', 'delivery', {
        type: Sequelize.FLOAT
      }),
      queryInterface.changeColumn('ListingData', 'securityDeposit', {
        type: Sequelize.FLOAT
      }),
      queryInterface.changeColumn('ListBlockedDates', 'isSpecialPrice', {
        type: Sequelize.FLOAT
      })
    ]
  }
};