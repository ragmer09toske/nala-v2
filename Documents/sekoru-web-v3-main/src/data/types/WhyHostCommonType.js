import {
	GraphQLObjectType as ObjectType,
	GraphQLString as StringType,
	GraphQLInt as IntType,
	GraphQLList as List
} from 'graphql';

const WhyHostType = new ObjectType({
	name: 'WhyHostType',
	fields: {
		id: { type: IntType },
		imageName: { type: StringType },
		title: { type: StringType },
		buttonLabel: { type: StringType },
	}
});

const WhyHostCommonType = new ObjectType({

	name: 'WhyHostCommonType',

	fields: {
		status: {
			type: IntType
		},
		errorMessage: {
			type: StringType
		},
		result: {
			type: WhyHostType
		},
		results: {
			type: new List(WhyHostType)
		},
		dataList: {
			type: new List(WhyHostType)
		},
	}

});

export default WhyHostCommonType;