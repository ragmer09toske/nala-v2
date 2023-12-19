'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.renameColumn('Listing', 'residenceType', 'transmission'),
      queryInterface.renameColumn('ListingData', 'cleaningPrice', 'delivery'),
      queryInterface.renameColumn('Reservation', 'cleaningPrice', 'delivery'),
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.renameColumn('Listing', 'transmission','residenceType'),
      queryInterface.renameColumn('ListingData','delivery', 'cleaningPrice'),
      queryInterface.renameColumn('Reservation', 'delivery','cleaningPrice'),
    ])
  }
};
