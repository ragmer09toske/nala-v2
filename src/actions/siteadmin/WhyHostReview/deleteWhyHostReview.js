// Toaster
import { toastr } from 'react-redux-toastr';
import {
    ADMIN_DELETE_REVIEW_START,
    ADMIN_DELETE_REVIEW_SUCCESS,
    ADMIN_DELETE_REVIEW_ERROR,
    UPDATE_REVIEW_START,
    UPDATE_REVIEW_SUCCESS,
    UPDATE_REVIEW_ERROR
} from '../../../constants';

import history from '../../../core/history';

import deleteMutation from './deleteReview.graphql';
import updateReviewMutation from './updateReview.graphql';

export function deleteWhyHostReview({ reviewId }) {

    return async (dispatch, getState, { client }) => {
        dispatch({
            type: ADMIN_DELETE_REVIEW_START,
            data: reviewId
        });
        try {

            const { data } = await client.mutate({
                mutation: deleteMutation,
                variables: { reviewId }
            });

            if (data && data.deleteWhyHostReview.status === 200) {
                dispatch({
                    type: ADMIN_DELETE_REVIEW_SUCCESS,
                });
                toastr.success("Delete Review", "Review deleted successfully!");
            } else {
                toastr.error("Error!", data && data.deleteWhyHostReview.errorMessage);
            }

        } catch (error) {
            dispatch({
                type: ADMIN_DELETE_REVIEW_ERROR,
                payload: {
                    error
                }
            });
        }
    };
}

export function updateReview(values) {

    return async (dispatch, getState, { client }) => {
        dispatch({
            type: UPDATE_REVIEW_START
        });
        try {

            const { data } = await client.mutate({
                mutation: updateReviewMutation,
                variables: {
                    id: values.id,
                    userName: values.userName,
                    reviewContent: values.reviewContent,
                    image: values.image,
                    isEnable: values.isEnable == 'false' ? 0 : 1
                },
            });

            if (data && data.updateWhyHostReview.status === 200) {
                dispatch({
                    type: UPDATE_REVIEW_SUCCESS,
                });
                toastr.success("Success!", "Review has been updated successfully!");
                history.push('/siteadmin/reviews');
            } else {
                toastr.error("Error!", data && data.updateWhyHostReview.errorMessage);
            }

            history.push('/siteadmin/whyHost/review');

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