import ShowUserProfileType from '../types/ShowUserProfileType';
import { User, UserLogin, UserClaim, UserProfile } from '../../data/models';

import {
  GraphQLList as List,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLNonNull as NonNull,
  GraphQLBoolean as BooleanType,
} from 'graphql';

const showUserProfile = {

  type: ShowUserProfileType,

  args: {
    profileId: { type: IntType },
    isUser: { type: BooleanType },
  },

  async resolve({ request }, { profileId, isUser }) {
    let where;
    if (isUser) {
      let userId = request.user.id;
      where = {
        userId
      };
    } else {
      where = {
        profileId
      };
    }

    // Get All User Profile Data
    const userData = await UserProfile.find({
      attributes: [
        'userId',
        'profileId',
        'firstName',
        'lastName',
        'dateOfBirth',
        'gender',
        'phoneNumber',
        'preferredLanguage',
        'preferredCurrency',
        'location',
        'info',
        'createdAt',
        'picture'
      ],
      where,
      include: [
        {
          model: User,
          as: 'user',
          required: true,
          where: {
            userDeletedAt: null,
            userDeletedBy: null
          }
        }
      ]
    });

    return userData;

  },
};

export default showUserProfile;
