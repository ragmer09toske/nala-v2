'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.sequelize.query("UPDATE `ListSettingsTypes` SET `isMultiValue`='0' WHERE `id`='20';"),
      queryInterface.sequelize.query("UPDATE `ListSettingsTypes` SET `isMultiValue`='0' WHERE `id`='21';")
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.sequelize.query("UPDATE `ListSettingsTypes` SET `isMultiValue`='0' WHERE `id`='20';"),
      queryInterface.sequelize.query("UPDATE `ListSettingsTypes` SET `isMultiValue`='0' WHERE `id`='21';")
    ])
  }
};
