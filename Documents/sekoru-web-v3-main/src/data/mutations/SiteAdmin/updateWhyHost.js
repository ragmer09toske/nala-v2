import {
	GraphQLString as StringType
} from 'graphql';
import { WhyHost } from '../../models';
import WhyHostCommonType from '../../types/WhyHostCommonType';


const updateWhyHost = {
	type: WhyHostCommonType,

	args: {
		dataList: { type: StringType }
	},

	async resolve({ request, response }, {
		dataList
	}) {

		try {

			if (request.user && request.user.admin) {

				let data = JSON.parse(dataList)

				if (data.length > 0) {

					let documentId = data && data.map((doc) => doc.id);


					let documentDelete = await WhyHost.destroy({
						where: {
							id: {
								notIn: [...documentId]
							}
						}
					});

					const bulkCreate = await WhyHost.bulkCreate(data, {
						updateOnDuplicate: ['imageName', 'title', 'buttonLabel']
					});

					return {
						status: 200
					}

				} else {
					return {
						status: 400,
						errorMessage: "Something went wrong! No records found. Please try again."
					}
				}

			} else {
				return {
					status: 500,
					errorMessage: "Something went wrong! Please login and try again."
				}
			}
		} catch (error) {
			return {
				errorMessage: 'Something went wrong! ' + error,
				status: 400
			}
		}
	}

};

export default updateWhyHost;