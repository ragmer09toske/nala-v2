import { gql } from 'react-apollo';
// Toaster
import { toastr } from 'react-redux-toastr';
import history from '../../../core/history';
import getReviewsDetails from './getReviewsDetails.graphql';

import {
    UPDATE_REVIEW_START,
    UPDATE_REVIEW_SUCCESS,
    UPDATE_REVIEW_ERROR,

} from '../../../constants';
import query from '../../../routes/siteadmin/userReviews/userReviewsQuery.graphql';

export function updateReviewStatus(id, type, refetchVariables) {

    return async (dispatch, getState, { client }) => {

        dispatch({
            type: UPDATE_REVIEW_START,
        });

        let mutation = gql`
        mutation updateReview($id: Int, $type: String){
            updateReview(id: $id, type: $type) {
              status
            }
          }
    `;

        try {

            const { data } = await client.mutate({
                mutation,
                variables: { id, type },
                refetchQueries: [{ query, variables: refetchVariables }]
            });

            if (data.updateReview.status === "success") {
                dispatch({
                    type: UPDATE_REVIEW_SUCCESS,
                });
                toastr.success("Success!", "updated successfully");
            } else {
                dispatch({
                    type: UPDATE_REVIEW_ERROR,
                    payload: {
                        status
                    }
                });
            }
        } catch (error) {
            dispatch({
                type: UPDATE_REVIEW_ERROR,
                payload: {
                    error
                }
            });
        }
    };
}



