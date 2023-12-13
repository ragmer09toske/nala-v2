import {
    GraphQLObjectType as ObjectType,
    GraphQLList as List,
    GraphQLInt as IntType,
    GraphQLString as StringType
} from 'graphql'

import AdminRolesType from './AdminRolesType';

const AdminRoleCommonType = new ObjectType({
    name: 'AdminRoleCommonType',
    fields: {
        result: {
            type: AdminRolesType
        },
        results: {
            type: new List(AdminRolesType)
        },
        status: {
            type: IntType
        },
        errorMessage: {
            type: StringType
        },
        count: {
            type: IntType
        },
    }
});

export default AdminRoleCommonType;