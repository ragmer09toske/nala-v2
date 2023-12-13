'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.bulkInsert('SiteSettings', [{
        title: 'Fcm PushNotification Key',
        name: 'fcmPushNotificationKey',
        value: '{"type":"service_account","project_id":"rentall-cars-e4188","private_key_id":"9b612b71a35a6bac349fa48079b95cc4c4faf688","private_key":"-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCV3DgxGhb7yKHU\nZsUaoxP2AI9bgxiDpz+CI92s3Ck/4Hex4k8sjleiQ5I6J6VAxTKqC5Hnv0MM91FR\nVr3xXGO5RBIeu9NL9NZU5Ja1Jv+/fTlsntAn5SkA0+KvzoK9w31vNImD0X8jcSSD\nK1F9ClWH66I98vgEzGKR1YRnmghPSuWx91U2oIVwzrNLjE1keTIR1XzfVg5Sp1aX\nEduo82gYqvflB6rMa0ARN3h2OWni7PcANBPnHfbQqjSQfXAR3Vh2chVOke9g8WVT\nz+kTN7gh2gtMVdDhEUyMAqGYs5QYubmjOPqYKAlgxmWNSc80CdUW+NKEtQw8TZBt\nRYdj5PGHAgMBAAECggEAAoViYp0UPucYpdiWv0R4DP7kan8xleFl5ZwR2hsYDI2L\npe/vMgow+jdVyemp04WdvROVwEbM63ZrpUkmx90shkzZWzAAtXnocyQnTuPZkJCc\nOzIOwWUPBAcMfLWmKGgV/51sJM4M6/02xogfhlF6r98sawtf1cDUdayYXh/OvPq4\nehVs2F6E9xAbJacNZj+KqfCzdL7haI749JHCsQgftdxSIqV6gPtwViBpgS6DmQmb\nxgk4a8O+A5/x2O+Cuy2GXCIMdOo2fdMu4ES1RlUqlyshB1R3HZ1T5dCt1DNeID4l\nHZ+VFqP24fgEOmgtQ9Tm08QhBWXna+Bn5ibE3T61xQKBgQDOeL0Re6cPDg4IhcSc\n2Jjs4IMO1dfu32BTeMbReIj7+aegVIs3HJInNdEtzFut09KqiH5QL2NPYXBITbUM\ndiVxtBDRauHuzVmAUEc40wCROud98mAgvpAlRujeUbP46Rlj0Wl2x/1acWddmHKP\nBNH7KazyZy0j8FXSqb8WLtQ+pQKBgQC5zwTgDGRQDcBFIA8x7YeXKc6Qh/aZQM04\nZf4fBOvRP2XLq/mwTNQH5CpajCPo+kXhRiMGPxBFXG16R1f3PlCQWCt9e70krL8W\n8q4QBhApB8CzF+Z92FRzvxqKw8KT9lOCkl/HGWnWE4BsDVwlIZiGh0E+YdCgttHU\nKGB5VL5DuwKBgDRrpR0ONuD0oY16YOutdk4VxlB67ILiRbOLo3bFUooe3XcwX9QT\nNewslro4+0HL2N2hH+i9z0n1JCvHRuMuD92paOeyakBV9JZGS37a23cD7IgmhE9r\n8m70bOUc+0OD8wVLwqn8po9S4Xp63QMAp0tMTnOQzH4mY7PDkxdPtmVdAoGAYEPz\nQKjq59bYAHhFpxZrI1QToynuByRdrpSY/jUsf/KaqNTmvgJv7860askkabYQslAG\nIVxW77idN7byyjPMxZwInDCZpACj2B3PNJoPkVJk8eS2FAkaaAVgmPgnPUVnqsRv\nPtXZ0YG1DUY2sT4gqcI1eT5wOnO9bm+k2/edw7UCgYEAjoR9ueNVYkIq2quPKUl9\nBtLZAXqG3vvqm+epWoeDfdbDQ1rRX8kUPHeoPzLm7F1I0GQkU9MXJ+fr3pgivjZF\nCWybuUeGFMXwqwMcp955L1r0L0PBWaCAcg5tIoacBJ0rHD3Asw3245Geb0nerxvJ\nGHrGk04rRqQnVGIKAGi0WCk=\n-----END PRIVATE KEY-----\n","client_email":"firebase-adminsdk-yn00j@rentall-cars-e4188.iam.gserviceaccount.com","client_id":"104063458630244102107","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_x509_cert_url":"https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-yn00j%40rentall-cars-e4188.iam.gserviceaccount.com","universe_domain":"googleapis.com"}',
        type: 'config_settings',
        createdAt: new Date(),
        updatedAt: new Date()
      }])
    ])
  },

  async down(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.bulkDelete('SiteSettings', {
        name: {
          $in: ['fcmPushNotificationKey']
        }
      })
    ])
  }
};
