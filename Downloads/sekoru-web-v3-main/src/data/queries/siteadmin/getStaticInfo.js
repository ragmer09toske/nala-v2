import StaticBlockType from '../../types/StaticBlockType';
import { StaticInfoBlock } from '../../../data/models';

import {
    GraphQLList as List,
    GraphQLString as StringType,
} from 'graphql';

const getStaticInfo = {

    type: new List(StaticBlockType),

    args: {
        name: { type: StringType },
    },

    async resolve({ request }, { name }) {

        let staticBlockData;

        if (name) {

            staticBlockData = await StaticInfoBlock.findAll({
                attributes: [
                    'id',
                    'title',
                    'name',
                    'value',
                ],
                where: {
                    name: name
                }
            });
        } else {

            staticBlockData = await StaticInfoBlock.findAll({
                attributes: [
                    'id',
                    'title',
                    'name',
                    'value',
                ],
            });
        }


        return staticBlockData;

    },
};

export default getStaticInfo;
