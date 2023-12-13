import { FindYourVehicleBlock } from '../../models';
import FindYourVehicleType from '../../types/FindYourVehicleType';

const getFindYourVehicleBlock = {

    type: FindYourVehicleType,

    async resolve({ request }) {
        try {

            const results = await FindYourVehicleBlock.findAll({
                attributes: [
                    'id',
                    'name',
                    'value',
                ],
            });

            return {
                results,
                status: 200
            }


        } catch (error) {
            return { status: 400, errorMessage: error };
        }
    }

};

export default getFindYourVehicleBlock;
