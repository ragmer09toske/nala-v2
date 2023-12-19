import SiteSettingsType from '../../../types/siteadmin/SiteSettingsType';
import { SiteSettings } from '../../../models';

import {
  GraphQLString as StringType,
} from 'graphql';

const uploadHomeLogo = {

  type: SiteSettingsType,

  args: {
    fileName: { type: StringType }
  },

  async resolve({ request }, { fileName }) {

    if(request.user && request.user.admin == true) {
        let removeLogo = await SiteSettings.destroy({
            where: {
              name: 'homePageLogo'
            }
        });

        let createLogoRecord = await SiteSettings.create({
            title: 'Home Page Logo',
            name: 'homePageLogo',
            value: fileName,
            type: 'site_settings'
        });

        if(createLogoRecord){
          return {
            status: 200
          }
        } else {
          return {
            status: 400
          }
        }

    } else {
        return {
            status: 400
        }
    }

  },
};

export default uploadHomeLogo;
