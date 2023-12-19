'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.bulkInsert('ListSettingsTypes', [{
        typeName: 'make',
        fieldType: 'stringType',
        step: 1,
        isEnable: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        typeLabel: 'Make',
        isMultiValue: 1
      }], {}),
      queryInterface.bulkInsert('ListSettingsTypes', [{
        typeName: 'odometer',
        fieldType: 'stringType',
        step: 1,
        isEnable: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        typeLabel: 'Odometer',
        isMultiValue: 1
      }], {})
    ])
  },

  down: (queryInterface, Sequelize) => {
    // return Promise.all([
    //   queryInterface.bulkDelete('ListSettingsTypes', {
    //     id: {
    //       $in: [22, 23]
    //     }
    //   })
    // ])
  }
};
