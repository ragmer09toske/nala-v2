'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.createTable('FindYourCarBlock', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: Sequelize.STRING,
        },
        value: {
          type: Sequelize.TEXT
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
      }),
      queryInterface.bulkInsert('FindYourCarBlock', [
        {
          name: 'heading',
          value: 'Book your car anywhere, anytime',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'buttonLabel',
          value: 'Find your car',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'buttonLink',
          value: '/s',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'content1',
          value: 'Take your pick from a wide range of cars with state of the art features and take them for a spin.',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'content2',
          value: 'Experience the joys of owning a car without the hassles that accompany ownership.',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'content3',
          value: 'Select the favorite cars of your choice from our wide range of cars book.',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'content4',
          value: null,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'content5',
          value: null,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'image',
          value: null,
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ])
    ])
  },

  async down(queryInterface, Sequelize) {

  }
};
