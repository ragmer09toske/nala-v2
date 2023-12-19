import StaticBlockType from '../../types/StaticBlockType';
import { StaticInfoBlock } from '../../models';

import {
    GraphQLString as StringType
} from 'graphql';

const uploadStaticBlockImage = {

    type: StaticBlockType,

    args: {
        fileName: { type: StringType },
        name: { type: StringType }
    },

    async resolve({ request }, { fileName, name }) {

        if (request.user && request.user.admin == true) {

            const UpdateStaticInfoBlock = await StaticInfoBlock.update({
                value: fileName
            }, {
                    where: {
                        name: name
                    }
                });

            if (UpdateStaticInfoBlock) {
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

export default uploadStaticBlockImage;
