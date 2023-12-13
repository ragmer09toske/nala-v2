'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.bulkInsert('WhyHostInfoBlock', [
        {
          title: 'Host banner content #2',
          value: 'Make money now!',
          name: 'hostBannerContent2',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: 'Host banner image #2',
          value: null,
          name: 'hostBannerImage2',
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
          $in: ['hostBannerContent2', 'hostBannerImage2']
        }
      })
    ])
  }
};
