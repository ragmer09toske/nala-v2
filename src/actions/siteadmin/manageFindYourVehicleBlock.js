import { gql } from 'react-apollo';

import {
    UPDATE_CAR_BLOCK_START,
    UPDATE_CAR_BLOCK_SUCCESS,
    UPDATE_CAR_BLOCK_ERROR,
} from '../../constants';

// Toaster
import { toastr } from 'react-redux-toastr';
import getFindYourVehicleBlockQuery from '../../routes/siteadmin/findYourVehicleBlock/getFindYourVehicleBlock.graphql'



export function manageFindYourVehicleBlock(values) {

    return async (dispatch, getState, { client }) => {

        dispatch({ type: UPDATE_CAR_BLOCK_START });

        let mutation = gql`
            mutation updateFindYourBlock(
                $heading: String,
                $buttonLabel: String,
                $buttonLink: String,
                $content1: String,
                $content2: String,
                $content3: String,
                $content4: String,
                $content5: String,
                $image: String
                ){
                    updateFindYourBlock(
                    heading: $heading,
                    buttonLabel: $buttonLabel,
                    buttonLink: $buttonLink,
                    content1: $content1,
                    content2: $content2,
                    content3: $content3,
                    content4: $content4,
                    content5: $content5,
                    image: $image
                ) {
                    status
                }
            }
        `;

        try {

            const { data } = await client.mutate({
                mutation,
                variables: values,
                refetchQueries: [{ query: getFindYourVehicleBlockQuery }]
            });

            if (data.updateFindYourBlock.status === 200) {
                toastr.success("Success!", "Changes are updated successfully!");
                dispatch({ type: UPDATE_CAR_BLOCK_SUCCESS });
            } else {
                dispatch({
                    type: UPDATE_CAR_BLOCK_ERROR,
                    payload: {
                        status: data.updateFindYourBlock.status
                    }
                });
            }
        } catch (error) {
            dispatch({
                type: UPDATE_CAR_BLOCK_ERROR,
                payload: {
                    error
                }
            });
        }
    };
}

