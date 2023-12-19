//Model
import { Privileges } from '../../../models';

//Type
import PrivilegesCommonType from '../../../types/siteadmin/PrivilegesCommonType';

const getPrivileges = {

	type: PrivilegesCommonType,

	async resolve({ request }) {

		try {

			const results = await Privileges.findAll();

			return {
				status: results.length > 0 ? 200 : 400,
				results,
				errorMessage: results.length > 0 ? null : "No record found."
			};

		} catch (error) {
			return {
				status: 400,
				errorMessage: 'Something went wrong ' + error
			};
		}
	}
};

export default getPrivileges;
