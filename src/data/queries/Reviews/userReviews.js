// GrpahQL
import {
	GraphQLList as List,
	GraphQLString as StringType,
	GraphQLInt as IntType
} from 'graphql';
import sequelize from '../../sequelize';
import { Reviews, UserProfile } from '../../models';
import ReviewsCommonType from '../../types/ReviewsCommonType';

const userReviews = {

	type: ReviewsCommonType,

	args: {
		ownerType: { type: StringType },
		offset: { type: IntType },
		profileId: { type: IntType },
		loadCount: { type: IntType },
		current: { type: StringType },
		searchKey: { type: StringType },
	},

	async resolve({ request, response }, { ownerType, offset, profileId, loadCount, current, searchKey }) {
		let limit = 3, searchFilter = {}, notRespondedFilter = {};
		let where = {};

		if (loadCount) {
			limit = loadCount;
		}
		let userId;
		if (profileId) {
			const getUser = await UserProfile.findOne({
				where: {
					profileId
				}
			});
			userId = getUser.userId;
		} else {
			if (request.user && !request.user.admin) {
				userId = request.user.id;
			}

		}

		if (ownerType === 'me') {
			where = {
				authorId: userId,
				isAdminEnable: true,
				isAdmin: false,
				parentId:0
			};
		} else {
			if (current == 'notResponded') {

				let notRespondedId = await sequelize.query(`select reservationId, COUNT(reservationId) as count from Reviews group by reservationId
				`, {
					type: sequelize.QueryTypes.SELECT
				});


				if (notRespondedId && notRespondedId.length > 0) {
					notRespondedFilter = {
						reservationId: {
							$in: notRespondedId
								.filter((item) => item.count == 1)
								.map(({ reservationId }) => reservationId)
						},
					};
				}

				where = {
					userId,
					isAdminEnable: true,
					$and: [
						notRespondedFilter
					],
					isAdmin: false
				}
			} else if (current == 'responded') {
				where = {
					authorId: userId,
					isAdminEnable: true,
					parentId: {
						$gt: 0
					},
					isAdmin: false
				}
			} else {
				where = {
					userId,
					isAdminEnable: true,
				}
			};
		}

		const totalCount = await Reviews.count({
			where
		});

		if (searchKey) {
			searchFilter = {
				$or: [
					{
						listId: {
							$in: [
							 	sequelize.literal(`SELECT id FROM Listing WHERE title like "%${searchKey}%"`)
							]
						},
					}, {
						id: {
							$in: [
								sequelize.literal(`SELECT id FROM Reviews WHERE reviewContent like "%${searchKey}%"`)
							]
						},
					},
					{
						userId: {
							$in: [
								sequelize.literal(`
                          SELECT
                              userId
                          FROM
                              UserProfile
                          WHERE firstName like "%${searchKey}%" OR lastName like "%${searchKey}%"
                        `)
							]
						},
					}, {
						authorId: {
							$in: [
								sequelize.literal(`
                          SELECT
                              userId
                          FROM
                              UserProfile
                          WHERE firstName like "%${searchKey}%" OR lastName like "%${searchKey}%"
                        `)
							]
						}
					}]
			};
			
			current == 'notResponded' ? where['$and'].push(searchFilter) : where['$and'] = searchFilter;
		}

		const count = await Reviews.count({
			where
		});

		const results = await Reviews.findAll({
			where,
			limit,
			offset,
			order: [['createdAt', 'DESC']]
		});

		return {
			results,
			totalCount,
			count
		}
	},
};

export default userReviews;

/**
query userReviews($ownerType: String){
	userReviews(ownerType: $ownerType){
		id
		reservationId
		listId
		authorId
		userId
		reviewContent
		rating
		parentId
		automated
		createdAt
		status
		response {
		  id
		  reservationId
		  listId
		  authorId
		  userId
		  reviewContent
		  rating
		  parentId
		  automated
		  createdAt
		  status
		}
	}
}
**/