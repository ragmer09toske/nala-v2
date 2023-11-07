import { gql } from 'react-apollo';
import { toastr } from 'react-redux-toastr';

import {
    SET_PAYOUT_STATUS_START,
    SET_PAYOUT_STATUS_SUCCESS,
    SET_PAYOUT_STATUS_ERROR
} from '../constants';

export function updatePayoutStatus(id, isHold) {
    return async (dispatch, getState, { client }) => {
        dispatch({
            type: SET_PAYOUT_STATUS_START
        });
        try {
            let mutation = gql`
            mutation updatePayoutStatus ($id: Int!, $isHold: Boolean!){
                updatePayoutStatus(id: $id, isHold: $isHold){
                    status
                    errorMessage
                }
              }
            `;

            const { data } = await client.mutate({
                mutation,
                variables: {
                    id,
                    isHold
                }
            });

            if(data && data.updatePayoutStatus && data.updatePayoutStatus.status == '200') {
                dispatch({
                    type: SET_PAYOUT_STATUS_SUCCESS
                });
                toastr.success("Success!", "Update status has success");
                return true;
            } else {
                dispatch({
                    type: SET_PAYOUT_STATUS_ERROR
                });
                toastr.error("Failed!", "Failed to Update status");
            }
        } catch(error) {
            dispatch({
                type: SET_PAYOUT_STATUS_ERROR
            });
            toastr.error("Failed!", "Failed to Update status");
        }
    }
}