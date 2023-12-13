import { AdminUser } from '../../../../data/models';
import AdminUserType from '../../../types/siteadmin/AdminUserType';

const getUserExists = {
    type: AdminUserType,
    async resolve({ request }) {
        try {
            // Check if user already logged in
            if (!request?.user?.admin) {
                return {
                    status: 400,
                };
            }
            const userData = await AdminUser.findOne({
                where: {
                    id: request.user.id
                }
            });

            return {
                status: userData ? 200 : 400,
            }
        } catch (error) {
            return {
                status: 400
            }
        }
    }
};
export default getUserExists;