'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.renameColumn('ListingData', 'minNight', 'minDay'),
      queryInterface.renameColumn('ListingData', 'maxNight', 'maxDay'),
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.renameColumn('ListingData','minDay', 'minNight'),
      queryInterface.renameColumn('ListingData', 'maxDay','maxNight'),
    ])
  }
};
