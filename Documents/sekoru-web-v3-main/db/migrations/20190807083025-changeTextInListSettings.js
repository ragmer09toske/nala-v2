'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.sequelize.query("UPDATE `ListSettingsTypes` SET `typeLabel`='Car Type' WHERE `id`='1';"),
      queryInterface.sequelize.query("UPDATE `ListSettingsTypes` SET `typeLabel`='Car Features' WHERE `id`='10';"),
      queryInterface.sequelize.query("UPDATE `ListSettingsTypes` SET `typeLabel`='Car Rules' WHERE `id`='14';"),
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.sequelize.query("UPDATE `ListSettingsTypes` SET `typeLabel`='Car Type' WHERE `id`='1';"),
      queryInterface.sequelize.query("UPDATE `ListSettingsTypes` SET `typeLabel`='Car Features' WHERE `id`='10';"),
      queryInterface.sequelize.query("UPDATE `ListSettingsTypes` SET `typeLabel`='Car Rules' WHERE `id`='14';"),
    ])
  }
};
