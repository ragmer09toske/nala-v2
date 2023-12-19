import {
  GraphQLInt as IntType,
  GraphQLString as StringType
} from 'graphql';
import sequelize from '../../../sequelize';

import { AdminRoles } from '../../../models';
import AdminRoleCommonType from '../../../types/siteadmin/AdminRoleCommonType';

const getAllAdminRoles = {

  type: AdminRoleCommonType,

  args: {
    currentPage: { type: IntType },
    searchList: { type: StringType }

  },

  async resolve({ request }, { currentPage, searchList }) {
    try {
      if (request.user && request.user.admin) {
        let limit = 10, offset = 0;

        if (currentPage) offset = (currentPage - 1) * limit;

        let keywordFilter = {};
        if (searchList) {
          keywordFilter = {
            id: {
              $in: [
                sequelize.literal(`SELECT id FROM AdminRoles WHERE name like "%${searchList}%" OR id like "%${searchList}%"`)
              ]
            }
          };
        }

        const results = await AdminRoles.findAll({
          where: {
            $and: [keywordFilter]
          },
          limit,
          offset,
          order: [['createdAt', 'DESC']],
        });

        const count = await AdminRoles.count({
          where: {
            $and: [keywordFilter]
          }
        });
        
        return await {
          results,
          count,
          status: 200
        };
      } else {
        return {
          status: 500,
          errorMessage: 'Please login as an admin user and try again.'
        };
      }
    }
    catch (error) {
      return {
        status: 400,
        errorMessage: 'Oops! Something went wrong! ' + error
      };
    }
  }
};

export default getAllAdminRoles;

