'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.sequelize.query("UPDATE ListSettingsTypes SET typeLabel = 'Trailer type' where typeLabel = 'Trailer Type';"),
      queryInterface.sequelize.query("UPDATE ListSettingsTypes SET typeLabel = 'Person capacity' where typeLabel = 'Person Capacity';"),
      queryInterface.sequelize.query("UPDATE ListSettingsTypes SET typeLabel = 'Bed rooms' where typeLabel = 'Bed Rooms';"),
      queryInterface.sequelize.query("UPDATE ListSettingsTypes SET typeLabel = 'Bathroom type' where typeLabel = 'Bathroom Type';"),
      queryInterface.sequelize.query("UPDATE ListSettingsTypes SET typeLabel = 'Trailer features' where typeLabel = 'Trailer Features';"),
      queryInterface.sequelize.query("UPDATE ListSettingsTypes SET typeLabel = 'Safety amenities' where typeLabel = 'Safety Amenities';"),
      queryInterface.sequelize.query("UPDATE ListSettingsTypes SET typeLabel = 'Renter requirements' where typeLabel = 'Renter Requirements';"),
      queryInterface.sequelize.query("UPDATE ListSettingsTypes SET typeLabel = 'Trailer rules' where typeLabel = 'Trailer Rules';"),
      queryInterface.sequelize.query("UPDATE ListSettingsTypes SET typeLabel = 'Review how renters book' where typeLabel = 'Review How Renters Book';"),
      queryInterface.sequelize.query("UPDATE ListSettingsTypes SET typeLabel = 'Booking notice time' where typeLabel = 'Booking Notice Time';"),
      queryInterface.sequelize.query("UPDATE ListSettingsTypes SET typeLabel = 'Maximum days notice' where typeLabel = 'Maximum Days Notice';"),
      queryInterface.sequelize.query("UPDATE ListSettingsTypes SET typeLabel = 'Minimum days' where typeLabel = 'Minimum Days';"),
      queryInterface.sequelize.query("UPDATE ListSettingsTypes SET typeLabel = 'Maximum days' where typeLabel = 'Maximum Days';"),

    ])
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
