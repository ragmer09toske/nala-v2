'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.sequelize.query("UPDATE `ListSettingsTypes` SET `typeName`='carType' WHERE `id`='1';"),
      queryInterface.sequelize.query("UPDATE `ListSettingsTypes` SET `typeName`='model' WHERE `id`='3';"),
      queryInterface.sequelize.query("UPDATE `ListSettingsTypes` SET `typeName`='year' WHERE `id`='4';"),
      queryInterface.sequelize.query("UPDATE `ListSettingsTypes` SET `typeName`='carFeatures' WHERE `id`='10';"),
      queryInterface.sequelize.query("UPDATE `ListSettingsTypes` SET `typeName`='carRules' WHERE `id`='14';"),      
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.sequelize.query("UPDATE `ListSettingsTypes` SET `typeName`='roomType' WHERE `id`='1';"),
      queryInterface.sequelize.query("UPDATE `ListSettingsTypes` SET `typeName`='houseType' WHERE `id`='3';"),
      queryInterface.sequelize.query("UPDATE `ListSettingsTypes` SET `typeName`='buildingSize' WHERE `id`='4';"),
      queryInterface.sequelize.query("UPDATE `ListSettingsTypes` SET `typeName`='essentialsAmenities' WHERE `id`='10';"),
      queryInterface.sequelize.query("UPDATE `ListSettingsTypes` SET `typeName`='houseRules' WHERE `id`='14';"),
    ])
  }
};
