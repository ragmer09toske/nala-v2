import {
    GraphQLObjectType as ObjectType,
    GraphQLList as List,
    GraphQLInt as IntType,
    GraphQLString as StringType
} from 'graphql'

import AdminUserType from './AdminUserType';

const AdminUserCommonType = new ObjectType({
    name: 'AdminUserCommonType',
    fields: {
        result: {
            type: AdminUserType
        },
        results: {
            type: new List(AdminUserType)
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

export default AdminUserCommonType;