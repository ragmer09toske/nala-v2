import ManageListingCommonType from '../types/ManageListingCommonType';

import { Listing, ListSettings } from '../../data/models';

import {
  GraphQLString as StringType,
} from 'graphql';
import sequelize from '../sequelize';

const ManageListings = {

  type: ManageListingCommonType,

  args: {
    searchKey: { type: StringType }
  },

  async resolve({ request }, { searchKey }) {

    if (request.user && request.user.admin != true) {

      let vehicleTypeFilter, where = {
        userId: request.user.id,
      }

      if (searchKey) {
        where = {
          title: {
            $like: '%' + searchKey + '%'
          },
          userId: request.user.id,
        }


        let listSettingsData = await ListSettings.findAll({
          attributes: ['id'],
          where: {
            itemName: {
              $like: '%' + searchKey + '%'
            },
            typeId: 1,
            isEnable: true
          },
          raw: true
        });

        if (listSettingsData && listSettingsData.length > 0) {
          vehicleTypeFilter = listSettingsData.map((item, index) => {
            return item.id;
          });
        }
        let carType

        if (vehicleTypeFilter > 0) {
          carType = {
            id: {
              $in: [
                sequelize.literal(`SELECT listId FROM UserListingData WHERE settingsId in (${vehicleTypeFilter})`)
              ]
            },
            userId: request.user.id,
            title: null,
          }
        } else {
          carType = {}
        }


        where = {
          $or: [
            {
              title: {
                $like: '%' + searchKey + '%'
              },
              userId: request.user.id,
            }, carType,
            {
              city: {
                $like: '%' + searchKey + '%'
              },
              userId: request.user.id,
              title: null,
            }
          ]
        }
      }

      const listingData = await Listing.findAll({
        where,
        order: 'createdAt DESC'
      });

      const userListingCount = await Listing.count({
        where: {
          userId: request.user.id,
        },
      });

      return {
        status: 200,
        results: listingData,
        userListingCount,
        searchKey
      };

    } else {
      return {
        status: "notLoggedIn"
      }
    }

  },
};

export default ManageListings;
