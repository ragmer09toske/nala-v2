import {
	GraphQLString as StringType,
	GraphQLList as List
} from 'graphql';

import { SiteSettings } from '../../models';

import SiteSettingsType from '../../types/siteadmin/SiteSettingsType';

const getConfigSettings = {

	type: new List(SiteSettingsType),

	args: {
		name: { type: StringType }
	},

	async resolve({ request }, { name }) {

		try {

			const configData = JSON.parse(name);

			const results = await SiteSettings.findAll({
				attributes: [
					'id',
					'name',
					'value',
				],
				where: {
					name: {
						$in: configData
					}
				}
			});

			return results;

		} catch (error) {
			return {
				status: '400',
				errorMessage: 'Oops! Something happened ' + error
			}
		}
	}
};

export default getConfigSettings;
