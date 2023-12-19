'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('ListingData', 'basePrice', {
        type: Sequelize.DOUBLE,
        defaultValue: 0
      }),
      queryInterface.changeColumn('ListingData', 'delivery', {
        type: Sequelize.DOUBLE,
        defaultValue: 0
      }),
      queryInterface.changeColumn('ListBlockedDates', 'isSpecialPrice', {
        type: Sequelize.DOUBLE,
        defaultValue: 0
      }),
      queryInterface.sequelize.query("UPDATE ListingData SET basePrice = 0 where basePrice IS NULL;"),
      queryInterface.sequelize.query("UPDATE ListBlockedDates SET isSpecialPrice = 0 where isSpecialPrice IS NULL;"),
    ])
  },

  down: (queryInterface, Sequelize) => {
  }
};
