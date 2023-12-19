import ShowListingType from '../types/ShowListingType';

import {
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull,
} from 'graphql';
import { Listing } from '../models';

const checkListing = {
    
    type: ShowListingType,

    args: {
        id: { type: new NonNull(IntType) },
    },

    async resolve({ request }, { id }) {

        if (request.user) {
        
            const getList = await Listing.findOne({
                attributes: ['id'],
                where: {
                    id: id,
                }
            })
          
            return {
                status : getList && getList.id ? 200 : 400
            }
        }
    }
}

export default checkListing;