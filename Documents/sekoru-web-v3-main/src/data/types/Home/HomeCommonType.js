import {
    GraphQLList as List,
    GraphQLInt as IntType,
    GraphQLString as StringType,
    GraphQLObjectType as ObjectType
} from 'graphql';

import BannerCommonType from './BannerCommonType';

const HomeCommonType = new ObjectType({
    name: 'HomeCommonType',
    fields: {
        status: {  type: IntType},
        errorMessage: { type: StringType },
        result: { type: BannerCommonType },
        results: { type: new List(BannerCommonType) },
    }
});

export default HomeCommonType;