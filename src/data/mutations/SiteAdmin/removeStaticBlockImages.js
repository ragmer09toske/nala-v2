import StaticBlockType from '../../types/StaticBlockType';
import { StaticInfoBlock } from '../../models';

import {
    GraphQLString as StringType
} from 'graphql';

const removeStaticBlockImages = {

    type: StaticBlockType,

    args: {
        name: { type: StringType },
    },

    async resolve({ request }, { name }) {

        if (request.user && request.user.admin == true) {

            let removeStaticImages = await StaticInfoBlock.update({
                value: null
            },
                {
                    where: { name: name }
                });

            if (removeStaticImages) {
                return {
                    status: 'success'
                }
            } else {
                return {
                    status: 'failed'
                }
            }

        } else {
            return {
                status: 'not logged in'
            }
        }

    },
};

export default removeStaticBlockImages;
