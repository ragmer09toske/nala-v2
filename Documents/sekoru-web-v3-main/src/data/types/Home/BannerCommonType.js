import {
    GraphQLObjectType as ObjectType,
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLBoolean as BooleanType,
    GraphQLList as List,
} from 'graphql';
import { FindYourVehicleBlock, Banner } from '../../models';

const NewBlockType = new ObjectType({
    name: 'NewBlockType',
    fields: {
        id: { type: StringType },
        name: { type: StringType },
        value: { type: StringType },
        title: {
            type: StringType
        },
        content: {
            type: StringType
        },
        isEnable: {
            type: BooleanType
        },
        image: {
            type: StringType
        },
    },
});

const BannerCommonType = new ObjectType({
    name: 'BannerCommonType',
    fields: {
        id: { type: IntType },
        title: { type: StringType },
        content: { type: StringType },
        isEnable: { type: BooleanType },
        getFindYouCar: {
            type: new List(NewBlockType),
            resolve() {
                return FindYourVehicleBlock.findAll({
                    attributes: [
                        'id',
                        'name',
                        'value',
                    ],
                });

            }
        },
        getBanner: {
            type: NewBlockType,
            resolve() {
                return Banner.findOne();
            }
        },

    }
});

export default BannerCommonType;