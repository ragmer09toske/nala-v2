import {
    GraphQLObjectType as ObjectType,
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLList as List,
    GraphQLBoolean as BooleanType
} from 'graphql';

const WhyHostReview = new ObjectType({
    name: 'WhyHostReview',
    fields: {
        id: { type: IntType },
        userName: { type: StringType },
        reviewContent: { type: StringType },
        image: { type: StringType },
        isEnable: { type: BooleanType },
    },
});

const WhyHostReviewType = new ObjectType({
    name: 'WhyHostReviewType',
    fields: {
        status: {
            type: IntType
        },
        count: {
            type: IntType
        },
        errorMessage: {
            type: StringType
        },
        result: {
            type: WhyHostReview
        },
        results: {
            type: new List(WhyHostReview)
        },
    }
});

export default WhyHostReviewType;