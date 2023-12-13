import {gql} from 'react-apollo';
import fetch from '../../core/fetch';

import {
    HOME_BANNER_UPLOAD_LOADER_START,
    HOME_BANNER_UPLOAD_LOADER_STOP,
    UPLOAD_HOME_BANNER_START,
    UPLOAD_HOME_BANNER_SUCCESS,
    UPLOAD_HOME_BANNER_ERROR,
} from '../../constants';

const query = gql `
{
    getBanner {
      id
      title
      content
      image
    }
  }
`;

export function startBannerUploaderLoader() {
    return (dispatch, getState, {client}) => {
        dispatch({
            type: HOME_BANNER_UPLOAD_LOADER_START,
            payload: {
                bannerUploaderLoading: true
            }
        });
    };
}

export function stopBannerUploaderLoader() {
    return (dispatch, getState, {client}) => {
        dispatch({
            type: HOME_BANNER_UPLOAD_LOADER_STOP,
            payload: {
                bannerUploaderLoading: false
            }
        });
    };
}


export function doUploadHomeBanner(image, oldImage, id) {

    return async(dispatch, getState, {client}) => {
        
        dispatch({type: UPLOAD_HOME_BANNER_START});

        let mutation = gql `
            mutation uploadHomeBanner($image: String!, $id: Int!){
                uploadHomeBanner(image: $image, id: $id) {
                    status
                }
            }
        `;

        try {

            const {data} = await client.mutate({
                mutation,
                variables: {
                    id,
                    image
                },
                refetchQueries: [{ query }]
            });

            if (data.uploadHomeBanner.status === "success") {
                dispatch({
                    type: UPLOAD_HOME_BANNER_SUCCESS,
                    payload: {
                        bannerUploaderLoading: false
                    }
                });
                if(oldImage != null){
                    await doRemoveHomeBanner(oldImage);
                }
            } else {
                dispatch({
                    type: UPLOAD_HOME_BANNER_ERROR, 
                    payload: {
                        status: data.uploadImageBanner.status,
                        bannerUploaderLoading: false
                    }
                });
            }
        } catch (error) {
            dispatch({
                type: UPLOAD_HOME_BANNER_ERROR, 
                payload: {
                    error,
                    bannerUploaderLoading: false
                }
            });
        }
    };
}

 
async function doRemoveHomeBanner(fileName) {        
    try {
        const resp = await fetch('/deleteHomeBanner', {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({fileName}),
            credentials: 'include'
        });
        const {status} = await resp.json();
        if(status){
            return true;
        } 
    } catch (error) {
        console.log('error', error);
    }
    
}
