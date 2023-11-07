import {
    GraphQLInt as IntType
} from 'graphql';
import { AdminReviews } from '../../../models';
import WhyHostReviewType from '../../../types/siteadmin/WhyHostReviewType';

const getWhyHostReview = {

    type: WhyHostReviewType,
    args: {
        reviewId: { type: IntType },
    },

    async resolve({ request }, { reviewId }) {
        try {

            if (!request.user) {
                return {
                    status: 500,
                    errorMessage: "You are not logged in, please login and try again!"
                }
            }

            const result = await AdminReviews.findOne({
                attributes: ['id', 'userName', 'reviewContent', 'image', 'isEnable'],
                where: {
                    id: reviewId
                }
            });

            return {
                result,
                status: result ? 200 : 400,
                errorMessage: result ? null : "Something went wrong on fetching records.Please try again."
            }

        } catch (e) {
            return {
                status: 400,
                errorMessage: 'Oops! Something went wrong! ' + e
            }
        }
    }
};

export default getWhyHostReview;
