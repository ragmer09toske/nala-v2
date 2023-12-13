'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
       queryInterface.sequelize.query("ALTER TABLE StaticPage CONVERT TO CHARACTER SET utf8 COLLATE utf8_unicode_ci;")
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
     
    ])
  }
};
