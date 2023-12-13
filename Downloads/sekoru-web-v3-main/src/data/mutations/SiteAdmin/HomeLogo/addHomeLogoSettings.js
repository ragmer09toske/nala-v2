import SiteSettingsType from '../../../types/siteadmin/SiteSettingsType';
import { SiteSettings } from '../../../models';


const addHomeLogoSettings = {

    type: SiteSettingsType,

    args: {},

    async resolve({ request }, {}) {

        // if (request.user && request.user.admin == true) {
            let isSiteSettingsUpdated = true;

            let addSettings =[
                {"name": "homePageLogoHeight","value": "", "title": "Home Page Logo Height", "type": "site_settings"},
                {"name": "homePageLogoWidth","value": "", "title": "Home Page Logo Width", "type": "site_settings"}
                ];
        
            let insert = await SiteSettings.bulkCreate(addSettings);

            if (isSiteSettingsUpdated) {
                return {
                    status: 200
                }
            } else {
                return {
                    status: 400
                }
            }

    },
};

export default addHomeLogoSettings;
/*
mutation addHomeLogoSettings {
  addHomeLogoSettings {
    status
  }
}
*/