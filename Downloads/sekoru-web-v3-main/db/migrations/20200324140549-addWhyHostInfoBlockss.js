'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.bulkInsert('WhyHostInfoBlock', [
      {
        title: 'Host Banner Title 1',
        value: '',
        name: 'hostBannerTitle1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Host Banner Content 1',
        value: '',
        name: 'hostBannerContent1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Host Banner Image 1',
        value: '',
        name: 'hostBannerImage1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Earn Block Title 1',
        value: '',
        name: 'earnBlockTitle1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Earn Block Content 1',
        value: '',
        name: 'earnBlockContent1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Earn Block Content 2',
        value: '',
        name: 'earnBlockContent2',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Why Block Title 1',
        value: '',
        name: 'whyBlockTitle1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Why Block Title 2',
        value: '',
        name: 'whyBlockTitle2',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Why Block Content 1',
        value: '',
        name: 'whyBlockContent1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Why Block Content 2',
        value: '',
        name: 'whyBlockContent2',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Easy Host Title 1',
        value: '',
        name: 'easyHostTitle1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Easy Host Content 1',
        value: '',
        name: 'easyHostContent1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Easy Host Content 2',
        value: '',
        name: 'easyHostContent2',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Work Title Heading',
        value: '',
        name: 'workTitleHeading',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Work Title 1',
        value: '',
        name: 'workTitle1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Work Title 2',
        value: '',
        name: 'workTitle2',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Work Content 1',
        value: '',
        name: 'workContent1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Work Content 2',
        value: '',
        name: 'workContent2',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Work Image 1',
        value: '',
        name: 'workImage1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Peace Title Heading',
        value: '',
        name: 'peaceTitleHeading',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Peace Title 1',
        value: '',
        name: 'peaceTitle1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Peace Title 2',
        value: '',
        name: 'peaceTitle2',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Peace Title 3',
        value: '',
        name: 'peaceTitle3',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Peace Content 1',
        value: '',
        name: 'peaceContent1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Peace Content 2',
        value: '',
        name: 'peaceContent2',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Peace Content 3',
        value: '',
        name: 'peaceContent3',
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
          $in: ['hostBannerTitle1', 'hostBannerContent1', 'earnBlockTitle1', 'earnBlockContent1', 'earnBlockContent2',
        'whyBlockTitle1', 'whyBlockTitle2', 'whyBlockContent1', 'whyBlockContent2', 'easyHostTitle1', 'easyHostContent1',
        'easyHostContent2', 'workTitleHeading', 'workTitle1', 'workTitle2', 'workContent1', 'workContent2',
        'workImage1', 'peaceTitleHeading', 'peaceTitle1', 'peaceTitle2', 'peaceContent1', 'peaceContent2', 'peaceTitle3', 'peaceContent3'
      ]
        }
      })
    ])
  }
};
