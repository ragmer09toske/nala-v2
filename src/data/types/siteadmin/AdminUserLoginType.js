import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLBoolean as BooleanType,
  GraphQLInt as IntType
} from 'graphql';
import AdminRolesType from '../../types/siteadmin/AdminRolesType';

import { AdminRoles } from '../../models';

const AdminUserLoginType = new ObjectType({
  name: 'adminUserLogin',
  fields: {
    id: { type: StringType },
    email: { type: StringType },
    password: { type: StringType },
    isSuperAdmin: { type: BooleanType },
    createdAt: { type: StringType },
    token: { type: StringType },
    status: { type: StringType },
    errorType: { type: StringType },
    errorMessage: { type: StringType },
    roleId: {
      type: IntType
    },
    adminRole: {
      type: AdminRolesType,
      async resolve(adminUser) {
        return await AdminRoles.findOne({
          where: {
            id: adminUser.roleId
          }
        });
      }
    },
  },
});

export default AdminUserLoginType;
