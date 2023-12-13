'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.sequelize.query("UPDATE `ListSettingsTypes` SET `typeLabel`='Minimum Days' WHERE `id`='18';"),
      queryInterface.sequelize.query("UPDATE `ListSettingsTypes` SET `typeLabel`='Maximum Days' WHERE `id`='19';"),
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.sequelize.query("UPDATE `ListSettingsTypes` SET `typeLabel`='Minimum Nights' WHERE `id`='18';"),
      queryInterface.sequelize.query("UPDATE `ListSettingsTypes` SET `typeLabel`='Maximum Nights' WHERE `id`='19';"),
    ])
  }
};
