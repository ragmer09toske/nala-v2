import ShowListingType from '../types/ShowListingType';
import {
  Listing,
  UserAmenities,
  UserSafetyAmenities,
  UserSpaces,
  ListSettings,
  ListSettingsTypes,
  UserListingData,
  ListBlockedDates
} from '../../data/models';

import {
  GraphQLList as List,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLNonNull as NonNull,
  GraphQLBoolean as BooleanType,
} from 'graphql';

const UserListing = {

  type: ShowListingType,

  args: {
    listId: { type: new NonNull(StringType) },
    preview: { type: BooleanType },
  },

  async resolve({ request }, { listId, preview }) {
    let where;
    if (request.user && request.user.admin) {
      where = {
        id: listId
      };
    } else if (request.user && preview) {
      where = {
        id: listId
      };
    } else {
      where = {
        id: listId,
        isPublished: true,
      };
    }

    const listingData = await Listing.find({
      where
    });

    return listingData;

  },
};

export default UserListing;
