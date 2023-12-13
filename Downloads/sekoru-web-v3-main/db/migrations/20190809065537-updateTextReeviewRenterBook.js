'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.sequelize.query("UPDATE `ListSettingsTypes` SET `typeLabel`='Review How Renters Book' WHERE `id`='15';"),
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.sequelize.query("UPDATE `ListSettingsTypes` SET `typeLabel`='Review How Guest Book' WHERE `id`='15';"),
    ])
  }
};
