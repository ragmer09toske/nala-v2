import SiteSettingsType from '../../types/siteadmin/SiteSettingsType';
import { SiteSettings } from '../../../data/models';

import {
  GraphQLList as List,
  GraphQLString as StringType,
} from 'graphql';

const siteSettings = {

  type: new List(SiteSettingsType),

  args: {
    type: { type: StringType },
  },

  async resolve({ request }, { type }) {

    let where = {
      name: {
        $ne: 'platformSecretKey'
      },
    };


    if (type) {
      where = {
        type,
        name: {
          $ne: 'platformSecretKey'
        },
      }
    }

    // Get Specific Type of Settings Data
    const siteSettingsData = await SiteSettings.findAll({
      attributes: [
        'id',
        'title',
        'name',
        'value',
        'type'
      ],
      where
    });

    return siteSettingsData;

  },
};

export default siteSettings;
