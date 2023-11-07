import {
    GraphQLBoolean as BooleanType,
    GraphQLInt as IntType,
    GraphQLString as StringType
} from 'graphql';
import { AdminReviews } from '../../../models';
import WhyHostReviewType from '../../../types/siteadmin/WhyHostReviewType';
import sequelize from '../../../sequelize';

const getWhyHostAllReviews = {

    type: WhyHostReviewType,
    args: {
        currentPage: { type: IntType },
        searchList: { type: StringType },
    },

    async resolve({ request }, { currentPage, searchList }) {
        try {

            if (!request.user) {
                return {
                    status: 500,
                    errorMessage: "You are not logged in, please login and try again!"
                }
            }

            let where = {}, keywordFilter = {};
            const limit = 10;
            let offset = 0;
            // Offset from Current Page
            if (currentPage) {
                offset = (currentPage - 1) * limit;
            }

            if (searchList && searchList.length > 0 && searchList.toString().trim() != '') {
                keywordFilter = {
                    id: {
                        $in: [sequelize.literal(`SELECT id FROM AdminReviews WHERE userName LIKE "%${searchList}%" OR id LIKE "%${searchList}%" OR reviewContent LIKE "%${searchList}%"`)]
                    }
                };
                where = keywordFilter;
            }


            const count = await AdminReviews.count({ where });

            let results = await AdminReviews.findAll({
                where,
                limit,
                offset,
            });

            return {
                count,
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

export default getWhyHostAllReviews;
