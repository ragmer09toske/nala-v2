'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.bulkInsert('WhyHostInfoBlock', [
        {
          title: 'Why-host block image #1',
          value: null,
          name: 'whyBlockImage1',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: 'Why-host block image #2',
          value: null,
          name: 'whyBlockImage2',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ])
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.bulkDelete('WhyHostInfoBlock', {
        name: {
          $in: ['whyBlockImage1', 'whyBlockImage2']
        }
      })
    ])
  }
};
