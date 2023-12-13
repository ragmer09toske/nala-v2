
import sequelize from '../../../sequelize';


import UserDocumentCommonType from '../../../types/siteadmin/UserDocumentListType';
import { User, DocumentVerification } from '../../../../data/models';

import {
  GraphQLList as List,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
  GraphQLInt as IntType
} from 'graphql';

const showAllDocument = {

  type: UserDocumentCommonType,
  args: {
    currentPage: { type: IntType },
    searchList: { type: StringType },
  },

  async resolve({ request, response }, { searchList, currentPage }) {

    try {

      if (request.user && request.user.admin == true) {
        const limit = 10;
        let offset = 0, searchFilter = {}, documentFilter = {
          id: {
            $in: [
              sequelize.literal(`SELECT distinct userId FROM DocumentVerification `)
            ]
          }
        };
        // Offset from Current Page
        if (currentPage) {
          offset = (currentPage - 1) * limit;
        }

        if (searchList) {
          searchFilter = {
            id: {
              $or: [{
                $in: [sequelize.literal(`SELECT userId FROM UserProfile WHERE firstName like '%${searchList}%'`)]
              }, {
                $in: [sequelize.literal(`SELECT id FROM User WHERE email like '%${searchList}%'`)]
              }, {
                $in: [sequelize.literal(`SELECT userId FROM UserProfile WHERE profileId like '%${searchList}%'`)]
              },]
            }
          }
        }


        // Get All User Profile Data
        const count = await User.count({
          where: {
            $and: [
              documentFilter,
              searchFilter
            ]
          }
        });

        // Get All User Profile Data
        const results = await User.findAll({
          attributes: ['id', 'email'],
          where: {
            $and: [
              documentFilter,
              searchFilter
            ]
          },
          limit,
          offset,
        });

        return {
          results,
          count
        }

      }
    } catch (error) {
      return {
        status: 400,
        errorMessage: 'Oops! Something went wrong! ' + error
      };
    }


  },
};

export default showAllDocument;


/*

query showAllDocument
{
  showAllDocument {
    id,
    email,
     profile{
          firstName
    }
  
  }
}

	


*/