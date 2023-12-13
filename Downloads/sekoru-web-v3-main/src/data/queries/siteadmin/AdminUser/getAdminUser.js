import { AdminUser } from '../../../../data/models';
import AdminUserType from '../../../types/siteadmin/AdminUserType';

const getAdminUser = {

  type: AdminUserType,

  async resolve({ request, response }) {
    try {
      if (request.user && request.user.admin) {
        return await AdminUser.findOne({
          where: {
            id: request.user.id
          }
        });
      } else {
        return {
          status: 500,
          errorMessage: 'Please login as an admin and try again.'
        };
      }
    } catch (error) {
      return {
        status: 400,
        errorMessage: 'Oops! something went wrong! ' + error
      };
    }
  }
};

export default getAdminUser;

/*

query {
    getAdminUser {
        status
        errorMessage
        id
        email
        isSuperAdmin
        createdAt
    }
}

*/
