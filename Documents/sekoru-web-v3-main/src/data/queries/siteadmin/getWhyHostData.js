import { WhyHost } from '../../models';
import WhyHostCommonType from '../../types/WhyHostCommonType';

const getWhyHostData = {
    type: WhyHostCommonType,

    async resolve({ request }) {
        if (request.user && request.user.admin == true) {
            let dataList = [];
            dataList = await WhyHost.findAll({
                attributes: [
                    'id',
                    'title',
                    'imageName',
                    'buttonLabel'
                ],
            });

            return await {
                dataList,
                status: 200
            }
        } else {
            return {
                status: 500,
                errorMessage: 'Please login and continue'
            }
        }
    }
}

export default getWhyHostData;