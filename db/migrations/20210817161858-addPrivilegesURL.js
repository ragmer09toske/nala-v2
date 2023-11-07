'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.bulkInsert('PrivilegesURL', [
        {
          privilegeId: 1,
          permittedUrls: '/siteadmin/settings/site',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          privilegeId: 2,
          permittedUrls: '/siteadmin/users',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          privilegeId: 2,
          permittedUrls: '/siteadmin/users',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          privilegeId: 2,
          permittedUrls: '/siteadmin/profileView/',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          privilegeId: 3,
          permittedUrls: '/become-a-owner/',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          privilegeId: 3,
          permittedUrls: '/siteadmin/listings',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          privilegeId: 4,
          permittedUrls: '/siteadmin/viewreservation/',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          privilegeId: 4,
          permittedUrls: '/siteadmin/reservations',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          privilegeId: 5,
          permittedUrls: '/siteadmin/user-reviews',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          privilegeId: 5,
          permittedUrls: '/siteadmin/management-reviews/',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          privilegeId: 6,
          permittedUrls: '/siteadmin/reviews',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          privilegeId: 6,
          permittedUrls: '/siteadmin/edit-review/',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          privilegeId: 6,
          permittedUrls: '/siteadmin/write-reviews',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          privilegeId: 7,
          permittedUrls: '/siteadmin/settings/servicefees',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          privilegeId: 8,
          permittedUrls: '/siteadmin/document',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          privilegeId: 9,
          permittedUrls: '/siteadmin/messages',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          privilegeId: 10,
          permittedUrls: '/siteadmin/reportUser',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          privilegeId: 11,
          permittedUrls: '/siteadmin/payout',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          privilegeId: 11,
          permittedUrls: '/siteadmin/failed-payout/',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          privilegeId: 11,
          permittedUrls: '/siteadmin/viewpayout/',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          privilegeId: 12,
          permittedUrls: '/siteadmin/payment-gateway-section',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          privilegeId: 13,
          permittedUrls: '/siteadmin/currency',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          privilegeId: 14,
          permittedUrls: '/siteadmin/settings/search',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          privilegeId: 15,
          permittedUrls: '/siteadmin/home/caption',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          privilegeId: 15,
          permittedUrls: '/siteadmin/home/banner',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          privilegeId: 15,
          permittedUrls: '/siteadmin/home/footer-block',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          privilegeId: 15,
          permittedUrls: '/siteadmin/popularlocation',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          privilegeId: 15,
          permittedUrls: '/siteadmin/popularlocation/add',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          privilegeId: 15,
          permittedUrls: '/siteadmin/edit/popularlocation/',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          privilegeId: 15,
          permittedUrls: '/siteadmin/home/static-info-block',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          privilegeId: 16,
          permittedUrls: '/siteadmin/whyHost/Block1',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          privilegeId: 16,
          permittedUrls: '/siteadmin/whyHost/Block2',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          privilegeId: 16,
          permittedUrls: '/siteadmin/whyHost/Block3',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          privilegeId: 16,
          permittedUrls: '/siteadmin/whyHost/Block4',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          privilegeId: 16,
          permittedUrls: '/siteadmin/whyHost/Block5',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          privilegeId: 16,
          permittedUrls: '/siteadmin/whyHost/Block6',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          privilegeId: 17,
          permittedUrls: '/siteadmin/listsettings/',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          privilegeId: 18,
          permittedUrls: '/siteadmin/content-management',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          privilegeId: 18,
          permittedUrls: '/siteadmin/page/add',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          privilegeId: 18,
          permittedUrls: '/siteadmin/edit/page/',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          privilegeId: 19,
          permittedUrls: '/siteadmin/staticpage/management',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          privilegeId: 19,
          permittedUrls: '/siteadmin/edit/staticpage/',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ])
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('PrivilegesURL', {
      privilegeId: {
        ne: null
      }
    })
  }
};