'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('ImageBanner', 'buttonLabel2', {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn('ImageBanner', 'buttonLink2', {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn('ImageBanner', 'buttonLink1', {
        type: Sequelize.STRING,
      })
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('ImageBanner', 'buttonLink1'),
      queryInterface.removeColumn('ImageBanner', 'buttonLink2'),
      queryInterface.removeColumn('ImageBanner', 'buttonLabel2'),
    ])
  }
};
