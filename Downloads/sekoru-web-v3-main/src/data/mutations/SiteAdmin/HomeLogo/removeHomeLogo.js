import SiteSettingsType from '../../../types/siteadmin/SiteSettingsType';
import { SiteSettings } from '../../../models';


const removeHomeLogo = {

  type: SiteSettingsType,

  async resolve({ request }) {

    if(request.user && request.user.admin == true) {
        let removeLogo = await SiteSettings.destroy({
            where: {
              name: 'homePageLogo'
            }
        });

        if(removeLogo){
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

export default removeHomeLogo;
