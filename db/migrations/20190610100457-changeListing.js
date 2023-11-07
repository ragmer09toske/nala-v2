'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.sequelize.query("UPDATE `ListSettingsTypes` SET `typeLabel`='Vehicle colors' WHERE `id`='7';"),
      queryInterface.sequelize.query("UPDATE `ListSettingsTypes` SET `typeLabel`='Car features' WHERE `id`='10';"),
      queryInterface.sequelize.query("UPDATE `ListSettingsTypes` SET `typeLabel`='Car rules' WHERE `id`='14';"),
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.sequelize.query("UPDATE `ListSettingsTypes` SET `typeLabel`='Vehicle colors' WHERE `id`='7';"),
      queryInterface.sequelize.query("UPDATE `ListSettingsTypes` SET `typeLabel`='Car features' WHERE `id`='10';"),
      queryInterface.sequelize.query("UPDATE `ListSettingsTypes` SET `typeLabel`='Car rules' WHERE `id`='14';"),
    ])
  }
};
