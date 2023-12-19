import { AdminRoles } from '../../../models';
import AdminRoleCommonType from '../../../types/siteadmin/AdminRoleCommonType';

const getAdminRoles = {

  type: AdminRoleCommonType,

  async resolve({ request }) {
    try {
      if (request.user && request.user.admin) {

        const results = await AdminRoles.findAll({
          order: [['createdAt', 'DESC']],
        });

        return await {
          results,
          status: 200
        };
      } else {
        return {
          status: 500,
          errorMessage: 'Please login as an admin user and try again.'
        };
      }
    }
    catch (error) {
      return {
        status: 400,
        errorMessage: 'Oops! Something went wrong! ' + error
      };
    }
  }
};

export default getAdminRoles;

