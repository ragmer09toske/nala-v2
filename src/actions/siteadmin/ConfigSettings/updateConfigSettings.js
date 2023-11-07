import {
    UPDATE_CONFIG_SETTINGS_START,
    UPDATE_CONFIG_SETTINGS_SUCCESS,
    UPDATE_CONFIG_SETTINGS_ERROR,
} from '../../../constants';


import updateConfigSettingsMutation from './updateConfigSettings.graphql';

import { setLoaderStart, setLoaderComplete } from '../../loader/loader';
import { setSiteSettings } from '../../siteSettings';
// Toaster
import { toastr } from 'react-redux-toastr';


export function updateConfigSettings(values) {
    return async (dispatch, getState, { client }) => {
        dispatch({
            type: UPDATE_CONFIG_SETTINGS_START,
        });
        dispatch(setLoaderStart('configSettings'));
        try {
            const { data } = await client.mutate({
                mutation: updateConfigSettingsMutation,
                variables: values
            })
            dispatch(setLoaderComplete('configSettings'));

            if (data && data.updateConfigSettings && data.updateConfigSettings.status == 200) {
                dispatch({ type: UPDATE_CONFIG_SETTINGS_SUCCESS });
                toastr.success("Success!", "Configurations updated successfully!");
                dispatch(setSiteSettings());
            }
            else {
                let errorMessage = data && data.updateConfigSettings && data.updateConfigSettings.errorMessage;
                dispatch({ type: UPDATE_CONFIG_SETTINGS_ERROR });
                toastr.error("Error!", errorMessage);
            }

        }
        catch (err) {
            dispatch({ type: UPDATE_CONFIG_SETTINGS_ERROR });
            toastr.error("Error!", "Oops! Something went wrong, " + err);
        }
    }
}
