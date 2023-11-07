'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.bulkInsert('StaticInfoBlock', [{
        title: 'CarCounterTitle1',
        value: '',
        name: 'carCounterTitle1',
        createdAt: new Date(),
        updatedAt: new Date()
      }]),
      queryInterface.bulkInsert('StaticInfoBlock', [{
        title: 'CarCounterContent1',
        value: '',
        name: 'carCounterContent1',
        createdAt: new Date(),
        updatedAt: new Date()
      }]),
      queryInterface.bulkInsert('StaticInfoBlock', [{
        title: 'CarCounterTitle2',
        value: '',
        name: 'carCounterTitle2',
        createdAt: new Date(),
        updatedAt: new Date()
      }]),
      queryInterface.bulkInsert('StaticInfoBlock', [{
        title: 'CarCounterContent2',
        value: '',
        name: 'carCounterContent2',
        createdAt: new Date(),
        updatedAt: new Date()
      }]),
      queryInterface.bulkInsert('StaticInfoBlock', [{
        title: 'CarCounterTitle3',
        value: '',
        name: 'carCounterTitle3',
        createdAt: new Date(),
        updatedAt: new Date()
      }]),
      
      queryInterface.bulkInsert('StaticInfoBlock', [{
        title: 'CarCounterImage1',
        value: '',
        name: 'carCounterImage1',
        createdAt: new Date(),
        updatedAt: new Date()
      }]),
      queryInterface.bulkInsert('StaticInfoBlock', [{
        title: 'CarBlockTitle1',
        value: '',
        name: 'carBlockTitle1',
        createdAt: new Date(),
        updatedAt: new Date()
      }]),
      queryInterface.bulkInsert('StaticInfoBlock', [{
        title: 'CarBlockTitle2',
        value: '',
        name: 'carBlockTitle2',
        createdAt: new Date(),
        updatedAt: new Date()
      }]),
      queryInterface.bulkInsert('StaticInfoBlock', [{
        title: 'CarBlockContent1',
        value: '',
        name: 'carBlockContent1',
        createdAt: new Date(),
        updatedAt: new Date()
      }]),
      queryInterface.bulkInsert('StaticInfoBlock', [{
        title: 'CarBlockImage1',
        value: '',
        name: 'carBlockImage1',
        createdAt: new Date(),
        updatedAt: new Date()
      }]),
      queryInterface.bulkInsert('StaticInfoBlock', [{
        title: 'CarTripTitle1',
        value: '',
        name: 'carTripTitle1',
        createdAt: new Date(),
        updatedAt: new Date()
      }]),
      queryInterface.bulkInsert('StaticInfoBlock', [{
        title: 'CarTripContent1',
        value: '',
        name: 'carTripContent1',
        createdAt: new Date(),
        updatedAt: new Date()
      }]),
      queryInterface.bulkInsert('StaticInfoBlock', [{
        title: 'CarTripTitle2',
        value: '',
        name: 'carTripTitle2',
        createdAt: new Date(),
        updatedAt: new Date()
      }]),
      queryInterface.bulkInsert('StaticInfoBlock', [{
        title: 'CarTripContent2',
        value: '',
        name: 'carTripContent2',
        createdAt: new Date(),
        updatedAt: new Date()
      }]),
      queryInterface.bulkInsert('StaticInfoBlock', [{
        title: 'CarTripTitle3',
        value: '',
        name: 'carTripTitle3',
        createdAt: new Date(),
        updatedAt: new Date()
      }]),
      queryInterface.bulkInsert('StaticInfoBlock', [{
        title: 'CarTripContent3',
        value: '',
        name: 'carTripContent3',
        createdAt: new Date(),
        updatedAt: new Date()
      }]),
      queryInterface.bulkInsert('StaticInfoBlock', [{
        title: 'CarTripImage1',
        value: '',
        name: 'carTripImage1',
        createdAt: new Date(),
        updatedAt: new Date()
      }]),
      queryInterface.bulkInsert('StaticInfoBlock', [{
        title: 'CarTripImage2',
        value: '',
        name: 'carTripImage2',
        createdAt: new Date(),
        updatedAt: new Date()
      }]),
      
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('StaticInfoBlock', {
      name: {
        $in: ['carCounterTitle1', 'carCounterTitle2', 'carCounterTitle3', 'carCounterContent1', 'carCounterContent2',
      'carCounterImage1', 'carBlockTitle1', 'carBlockTitle2', 'carBlockContent1', 'carBlockImage1', 'carTripTitle1',
    'carTripTitle2', 'carTripTitle3', 'carTripContent1', 'carTripContent2', 'carTripContent3', 'carTripImage1', 'carTripImage2']
      }
    })
  }
};
