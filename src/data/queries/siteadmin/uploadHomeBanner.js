import BannerType from '../../types/BannerType';
import { Banner } from '../../../data/models';

import {
  GraphQLList as List,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLNonNull as NonNull,
  GraphQLObjectType as ObjectType,
} from 'graphql';

const uploadHomeBanner = {

  type: BannerType,

  args: {
    image: { type: StringType },
    id: { type: IntType }
  },

  async resolve({ request }, { image, id }) {

    if(request.user && request.user.admin == true) {
       let isImageUploaded = false;

       // Site Name
       const updateImage = await Banner.update({ 
         image
        },
        {
          where: {
            id
          }
        })
       .then(function(instance){
         // Check if any rows are affected
         if(instance > 0) {
           isImageUploaded = true;
         } else {
            isImageUploaded = false;
         }
       });

       if(isImageUploaded) {
         return {
           status: 'success'
         }
       } else {
           return {
             status: 'failed'
           }
       }

     } else {
         return {
           status: 'notLoggedIn'
         }
     }

  },
};

export default uploadHomeBanner;
