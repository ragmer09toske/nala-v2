import ListSettingsType from '../../types/siteadmin/AdminListSettingsType';
import { ListSettingsTypes } from '../../../data/models';

const getCarDetails = {

    type: ListSettingsType,

    async resolve({ request }) {
        if (request.user && request.user.admin == true) {

            const getResults = await ListSettingsTypes.find({
                where: {
                    id: 20
                }
            });

            if (!getResults) {
                return {
                    status: "failed"
                }
            }

            return getResults;

        } else {
            return {
                status: "failed"
            }
        }
    },

};

export default getCarDetails;
