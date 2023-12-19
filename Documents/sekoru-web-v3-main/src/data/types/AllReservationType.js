import {
	GraphQLObjectType as ObjectType,
	GraphQLList as List,
	GraphQLString as StringType,
	GraphQLInt as IntType,
} from 'graphql';

import ReservationType from './ReservationType';

const AllReservationType = new ObjectType({
	name: 'AllReservation',
	fields: {
		reservationData: {
			type: new List(ReservationType)
		},
		count: {
			type: IntType
		},
		totalCount: {
			type: IntType
		},
		currentPage: {
			type: IntType
		},
		status: {
			type: StringType
		},
		totalData: {
			type: new List(ReservationType)
		},
		dateFilter: { type: StringType },
		listId: { type: IntType },
		startDate: { type: StringType },
		endDate: { type: StringType },
		orderBy: { type: StringType },
		searchKey: { type: StringType }
	}
});

export default AllReservationType;