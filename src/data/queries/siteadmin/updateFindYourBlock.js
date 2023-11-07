
import {
  GraphQLString as StringType,
} from 'graphql';
import { FindYourVehicleBlock } from '../../models';
import FindYourVehicleType from '../../types/FindYourVehicleType';

const updateFindYourBlock = {

  type: FindYourVehicleType,

  args: {
    heading: { type: StringType },
    buttonLabel: { type: StringType },
    buttonLink: { type: StringType },
    content1: { type: StringType },
    content2: { type: StringType },
    content3: { type: StringType },
    content4: { type: StringType },
    content5: { type: StringType },
    image: { type: StringType },
  },

  async resolve({ request }, {
    heading,
    buttonLabel,
    buttonLink,
    content1,
    content2,
    content3,
    content4,
    content5,
    image
  }) {
    try {
      if (request.user && request.user.admin == true) {
        let siteSettingsFields = {
          heading,
          buttonLabel,
          buttonLink,
          content1,
          content2,
          content3,
          content4,
          content5,
          image
        };

        await Promise.all([
          Object.keys(siteSettingsFields).map(async (item) => {
            await FindYourVehicleBlock.update({ value: siteSettingsFields[item] }, { where: { name: item } })
          })
        ])

        return {
          status: 200
        }

      } else {
        return {
          status: 500,
          errorMessage: 'Please login and continue.'
        }
      }
    } catch (e) {
      return {
        status: 400,
        errorMessage: 'Oops! Something went wrong! ' + e
      }
    }

  },
};

export default updateFindYourBlock;
