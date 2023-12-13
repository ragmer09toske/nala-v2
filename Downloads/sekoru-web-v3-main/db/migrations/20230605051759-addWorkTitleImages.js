'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.bulkInsert('WhyHostInfoBlock', [
        {
          title: 'Worktitle image #2',
          value: null,
          name: 'workImage2',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: 'Worktitle image #3',
          value: null,
          name: 'workImage3',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: 'Worktitle image #4',
          value: null,
          name: 'workImage4',
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ])
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.bulkDelete('WhyHostInfoBlock', {
        name: {
          $in: ['workImage2', 'workImage3', 'workImage4']
        }
      })
    ])
  }
};
