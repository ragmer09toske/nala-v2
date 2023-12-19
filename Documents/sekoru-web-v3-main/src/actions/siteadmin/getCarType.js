import { gql } from 'react-apollo';

import {
    CAR_LOAD_LIST_SETTINGS_START,
    CAR_LOAD_LIST_SETTINGS_SUCCESS,
    CAR_LOAD_LIST_SETTINGS_ERROR
} from '../../constants';

const query = gql`
  query {
    getCarDetails{
      	id
      	typeName
        typeLabel
        fieldType
      	isEnable
      	step
        listSettings {
          id
          typeId
          itemName
          itemDescription
          otherItemName
          startValue
          endValue
          maximum
          minimum
          isEnable
          makeType
        }
        status
    	}
  	}
`;

export function getCarType() {

    return async (dispatch, getState, { client }) => {

        dispatch({
            type: CAR_LOAD_LIST_SETTINGS_START,
        });

        try {
            // Send Request to get listing data for admin panel
            const { data } = await client.query({
                query,
                //   variables: {typeId},
                fetchPolicy: 'network-only'
            });

            
            if (!data && !data.getCarDetails) {
                dispatch({
                    type: CAR_LOAD_LIST_SETTINGS_ERROR,
                });
            } else {
                dispatch({
                    type: CAR_LOAD_LIST_SETTINGS_SUCCESS,
                    isCarDetails: data && data.getCarDetails,
                });
            }

        } catch (error) {
            dispatch({
                type: CAR_LOAD_LIST_SETTINGS_ERROR,
                payload: {
                    error
                }
            });
            return false;
        }
        return true;
    };
}
