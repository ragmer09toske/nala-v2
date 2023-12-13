import {
    GraphQLString as StringType,
    GraphQLNonNull as NonNull
} from 'graphql';

import { SiteSettings } from '../../../models';

import SiteSettingsType from '../../../types/siteadmin/SiteSettingsType';

const updateSiteSettingsLogo = {

    type: SiteSettingsType,

    args: {
        title: { type: new NonNull(StringType) },
        name: { type: new NonNull(StringType) },
        value: { type: new NonNull(StringType) }
    },

    async resolve({ request }, { title, name, value }) {

        try {
            if (request.user && request.user.admin == true) {

                const getData = await SiteSettings.findOne({
                    attributes: ['id'],
                    where: { title, name },
                    raw: true
                });

                if (getData && getData.id) {
                    await SiteSettings.update({ value }, { where: { id: getData.id } });
                } else {
                    await SiteSettings.create({ title, name, value, type: 'site_settings' });
                }

                return { status: 'Success' };

            } else {
                return { status: 'not logged in' };
            }
        } catch (e) {
            return {
                status: '400',
                errorMessage: 'Oops! Something happened ' + e
            };
        }
    }
};

export default updateSiteSettingsLogo;

/*

mutation updateSiteSettingsLogo($title: String!, $name: String!, $value: String!) {
    updateSiteSettingsLogo(title:$title, name: $name, value: $value) {
        status
        errorMessage
    }
}

*/