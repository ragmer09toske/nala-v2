import {
	GraphQLObjectType as ObjectType,
	GraphQLString as StringType,
	GraphQLInt as IntType,
	GraphQLList as List
} from 'graphql';

import ShowListingType from './ShowListingType';

const ManageListingCommonType = new ObjectType({

	name: 'ManageListingCommonType',

	fields: {
		status: {
			type: IntType
		},
		errorMessage: {
			type: StringType
		},
		result: {
			type: ShowListingType
		},
		results: {
			type: new List(ShowListingType)
		},
		userListingCount: {
			type: IntType
		},
		searchKey: {
			type: StringType
		}
	}

});

export default ManageListingCommonType;