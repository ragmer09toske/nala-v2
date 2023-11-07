'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return Promise.all([
      queryInterface.createTable('WhyHost', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        imageName: {
          type: Sequelize.STRING,
        },
        title: {
          type: Sequelize.STRING
        },
        buttonLabel: {
          type: Sequelize.STRING
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
      }),
      queryInterface.bulkInsert('WhyHost', [{
        imageName: null,
        title: 'Loreum LoreumLoreumLoreumLoreumLoreumLoreumLoreumLoreumLoreumLoreum',
        buttonLabel: 'Loreum',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        imageName: null,
        title: 'LoreumLoreumLoreumLoreumLoreumLoreumLoreumLoreumLoreumLoreum',
        buttonLabel: 'Loreum',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        imageName: null,
        title: 'LoreumLoreumLoreumLoreumLoreumLoreumLoreumLoreumLoreumLoreumLoreumLoreum',
        buttonLabel: 'Loreum',
        createdAt: new Date(),
        updatedAt: new Date()
      }])
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('WhyHost', {
      imageName: null
    })
  }
};
