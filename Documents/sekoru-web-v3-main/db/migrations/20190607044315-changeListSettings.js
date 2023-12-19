'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.sequelize.query("UPDATE `ListSettingsTypes` SET `typeLabel`='Car type' WHERE `id`='1';"),
      queryInterface.sequelize.query("UPDATE `ListSettingsTypes` SET `typeLabel`='Model' WHERE `id`='3';"),
      queryInterface.sequelize.query("UPDATE `ListSettingsTypes` SET `typeLabel`='Year' WHERE `id`='4';"),
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.sequelize.query("UPDATE `ListSettingsTypes` SET `typeLabel`='Car type' WHERE `id`='1';"),
      queryInterface.sequelize.query("UPDATE `ListSettingsTypes` SET `typeLabel`='Model' WHERE `id`='3';"),
      queryInterface.sequelize.query("UPDATE `ListSettingsTypes` SET `typeLabel`='Year' WHERE `id`='4';"),
    ])
  }
};
