import {
    GraphQLObjectType as ObjectType,
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLList as List
} from 'graphql';
import ReviewsType from './ReviewsType';


const ReviewsCommonType = new ObjectType({

    name: 'ReviewsCommonType',

    fields: {
        status: {
            type: IntType
        },
        count: {
            type: IntType
        },
        totalCount: {
            type: IntType
        },
        errorMessage: {
            type: StringType
        },
        result: {
            type: ReviewsType
        },
        results: {
            type: new List(ReviewsType)
        },
    }

});

export default ReviewsCommonType;