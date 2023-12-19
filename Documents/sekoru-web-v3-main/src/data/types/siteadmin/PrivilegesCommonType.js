import {
    GraphQLObjectType as ObjectType,
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLList as List
} from 'graphql';

import { PrivilegesURL } from '../../models';

const PrivilegesType = new ObjectType({
    name: 'PrivilegesType',
    fields: {
        id: {
            type: IntType
        },
        privilege: {
            type: StringType
        },
        createdAt: {
            type: StringType
        },
        updatedAt: {
            type: StringType
        },
        permittedUrls: {
            type: new List(StringType),
            async resolve(data) {
                let privilegesURL = await PrivilegesURL.findAll({
                    attributes: ['permittedUrls'],
                    where: {
                        privilegeId: data.id
                    },
                    raw: true
                });

                return await privilegesURL.map((item) => item.permittedUrls);

            }
        }
    }
});

const PrivilegesCommonType = new ObjectType({
    name: 'PrivilegesCommonType',
    fields: {
        status: {
            type: IntType
        },
        errorMessage: {
            type: StringType
        },
        result: {
            type: PrivilegesType
        },
        results: {
            type: new List(PrivilegesType)
        }
    }
});

export default PrivilegesCommonType;