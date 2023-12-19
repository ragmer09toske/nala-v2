'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('UserProfile', 'country', {
        type: Sequelize.INTEGER,
        defaultValue: null
      }),
      queryInterface.sequelize.query('UPDATE UserProfile SET country=null WHERE country=1;')
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('UserProfile', 'country'),
    ])
  }
};
