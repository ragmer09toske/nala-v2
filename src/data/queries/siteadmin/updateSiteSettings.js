import {
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLBoolean as BooleanType
} from 'graphql';
import { SiteSettings } from '../../../data/models';
import UpdateSiteSettingsType from '../../types/siteadmin/UpdateSiteSettingsType';

const updateSiteSettings = {

    type: UpdateSiteSettingsType,

    args: {
        siteName: { type: StringType },
        siteTitle: { type: StringType },
        metaDescription: { type: StringType },
        logo: { type: StringType },
        facebookLink: { type: StringType },
        twitterLink: { type: StringType },
        instagramLink: { type: StringType },
        homePageType: { type: IntType },
        videoLink: { type: StringType },
        metaKeyword: { type: StringType },
        phoneNumberStatus: { type: IntType },
        appAvailableStatus: { type: BooleanType },
        playStoreUrl: { type: StringType },
        appStoreUrl: { type: StringType },
        email: { type: StringType },
        phoneNumber: { type: StringType },
        address: { type: StringType },
        appForceUpdate: { type: StringType },
        androidVersion: { type: StringType },
        iosVersion: { type: StringType }
    },

    async resolve({ request }, {
        siteName,
        siteTitle,
        metaDescription,
        logo,
        facebookLink,
        twitterLink,
        instagramLink,
        homePageType,
        videoLink,
        metaKeyword,
        phoneNumberStatus,
        appAvailableStatus,
        playStoreUrl,
        appStoreUrl,
        email,
        phoneNumber,
        address,
        appForceUpdate,
        androidVersion,
        iosVersion
    }) {

        if (request.user && request.user.admin == true) {

            let siteSettingsFields = {
                siteName,
                siteTitle,
                metaDescription,
                logo,
                facebookLink,
                twitterLink,
                instagramLink,
                homePageType,
                videoLink,
                metaKeyword,
                phoneNumberStatus,
                appAvailableStatus,
                playStoreUrl,
                appStoreUrl,
                email,
                phoneNumber,
                address,
                appForceUpdate,
                androidVersion,
                iosVersion
            };

            await Promise.all(
                Object.keys(siteSettingsFields).map(async (item) => {
                    await SiteSettings.update({ value: siteSettingsFields[item] }, { where: { name: item } })
                })
            );

            return {
                status: 'success'
            }

        } else {
            return {
                status: 'failed'
            }
        }

    },
};

export default updateSiteSettings;
