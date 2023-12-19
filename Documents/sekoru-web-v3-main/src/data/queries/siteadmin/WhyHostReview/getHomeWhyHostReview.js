import { AdminReviews } from '../../../models';
import WhyHostReviewType from '../../../types/siteadmin/WhyHostReviewType';

const getHomeWhyHostReview = {

    type: WhyHostReviewType,

    async resolve({ request }) {
        try {

            let results = await AdminReviews.findAll({
                where: {
                    isEnable: true
                }
            });

            return {
                results,
                status: results ? 200 : 400,
                errorMessage: results ? null : "Something went wrong on fetching records.Please try again."
            }

        } catch (e) {
            return {
                status: 400,
                errorMessage: 'Oops! Something went wrong! ' + e
            }
        }
    }
};

export default getHomeWhyHostReview;
