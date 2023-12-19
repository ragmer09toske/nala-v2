// GrpahQL
import {
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLBoolean as BooleanType,
} from 'graphql';

// Sequelize models
import { AdminReviews } from '../../../models';
import WhyHostReviewType from '../../../types/siteadmin/WhyHostReviewType';

const updateWhyHostReview = {

    type: WhyHostReviewType,

    args: {
        id: { type: IntType },
        userName: { type: StringType },
        reviewContent: { type: StringType },
        image: { type: StringType },
        isEnable: { type: BooleanType }
    },

    async resolve({ request, response }, {
        id,
        userName,
        reviewContent,
        image,
        isEnable
    }) {
        try {
            if (!request.user) {
                return {
                    status: 500,
                    errorMessage: "Oops! Please login with your account and try again."
                };
            }

            let updateReview;

            if (id) {
                updateReview = await AdminReviews.update(
                    {
                        userName,
                        reviewContent,
                        image,
                        isEnable
                    },
                    {
                        where: {
                            id
                        }
                    }
                );

            } else {
                updateReview = await AdminReviews.create({
                    userName,
                    reviewContent,
                    image,
                    isEnable
                });
            }

            return {
                status: updateReview ? 200 : 400,
                errorMessage: updateReview ? null : "Something went wrong! Couldn't update the review. Please try again later."
            }

        } catch (error) {
            return {
                status: 400,
                errorMessage: "Something went wrong. " + error
            };
        }

    }
}

export default updateWhyHostReview;