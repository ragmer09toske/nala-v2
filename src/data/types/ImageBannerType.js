import {
    GraphQLObjectType as ObjectType,
    GraphQLID as ID,
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull,
    GraphQLBoolean as BooleanType
} from 'graphql';

const ImageBannerType = new ObjectType({
    name: 'ImageBanner',
    fields: {
        id: {
            type: IntType
        },
        title: {
            type: StringType
        },
        description: {
            type: StringType
        },
        buttonLabel: {
            type: StringType
        },
        image: {
            type: StringType
        },
        status: {
            type: StringType
        },
        buttonLabel2: {
            type: StringType
        },
        buttonLink1: {
            type: StringType
        },
        buttonLink2: {
            type: StringType
        },
    }
});

export default ImageBannerType;