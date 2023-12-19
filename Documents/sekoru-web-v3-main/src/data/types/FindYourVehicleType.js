import {
    GraphQLList as List,
    GraphQLObjectType as ObjectType,
    GraphQLInt as IntType,
    GraphQLString as StringType,
} from 'graphql';

const BlockType = new ObjectType({
    name: 'BlockType',
    fields: {
        id: { type: StringType },
        name: { type: StringType },
        value: { type: StringType },
    },
});


const FindYourVehicleType = new ObjectType({
    name: 'FindYourVehicleType',
    fields: {
        results: { type: new List(BlockType) },
        errorMessage: { type: StringType },
        status: { type: IntType }
    }
});

export default FindYourVehicleType;
