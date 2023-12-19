// GrpahQL
import {
    GraphQLList as List,
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull,
} from 'graphql';

import ReviewsWholeType from '../../../types/siteadmin/ReviewsWholeType';
import { Reviews } from '../../../models';
import sequelize from '../../../sequelize';
import moment from 'moment';
const getReviewsDetails = {

    type: ReviewsWholeType,
    args: {
        currentPage: { type: IntType },
        searchList: { type: StringType },
    },

    async resolve({ request }, { currentPage, searchList }) {

        // if (request.user && request.user.admin == true) {
        //     return await Reviews.findAll({
        //         where: {
        //             isAdmin: false
        //         }
        //     });
        // }

        if (request.user && request.user.admin == true) {
            const limit = 10;
            let offset = 0;
            // Offset from Current Page
            if (currentPage) {
                offset = (currentPage - 1) * limit;
            }

            let reviewsData, userCountLength, where;
            if (searchList) {
                // let getDate = moment(searchList).format('YYYY-MM-DD');
                where = {
                    isAdmin: false,
                    $or: [
                        {
                            id: {
                                $or: [
                                    {
                                        $in: [
                                            sequelize.literal(
                                                `SELECT id FROM Reviews WHERE listId IN(SELECT id FROM Listing WHERE title LIKE "%${searchList}%")`
                                            )]
                                    },
                                ]
                            },
                        },
                        {
                            reviewContent: {
                                $like: '%' + searchList + '%'
                            }
                        },
                        {
                            rating: {
                                $like: '%' + searchList + '%'
                            }
                        },
                        {
                            listId: {
                                $like: '%' + searchList + '%'
                            }
                        }
                    ],
                }
                userCountLength = await Reviews.count({
                    where
                });
                reviewsData = await Reviews.findAll({
                    where,
                    order: [['updatedAt', 'DESC']],
                    limit,
                    offset,
                });
            } else {
                userCountLength = await Reviews.count({
                    where: {
                        isAdmin: false,
                    },
                });
                // Get All User Profile Data
                reviewsData = await Reviews.findAll({
                    where: {
                        isAdmin: false,
                    },
                    limit,
                    offset,
                    order: [
                        ['updatedAt', 'DESC']
                    ],
                });
            }
            return {
                reviewsData,
                count: userCountLength
            };
        }
    }
};

export default getReviewsDetails;

/*
query getReviewsDetails{
        getReviewsDetails{
      id
      reservationId
      listId
      authorId
      userId
      reviewContent
      rating
      privateFeedback
      parentId
      automated
      isAdmin
      createdAt
      updatedAt
    }
}
*/
