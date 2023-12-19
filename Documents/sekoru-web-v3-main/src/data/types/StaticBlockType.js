import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLBoolean as BooleanType
} from 'graphql';

const StaticBlockType = new ObjectType({
  name: 'StaticBlock',
  fields: {
    id: { type: StringType },
    title: { type: StringType },
    name: { type: StringType },
    value: { type: StringType },
    status: { type: StringType }
  },
});

export default StaticBlockType;
