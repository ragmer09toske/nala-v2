import {gql} from 'react-apollo';
import fetch from '../../core/fetch';
import {setSiteSettings} from '../siteSettings';

import {
  LOGO_UPLOAD_START,
  HOME_LOGO_UPLOAD_LOADER_START,
  HOME_LOGO_UPLOAD_LOADER_STOP,
  HOME_LOGO_UPLOAD_SUCCESS,
  HOME_LOGO_UPLOAD_ERROR,
  REMOVE_HOME_LOGO_SUCCESS,
  REMOVE_HOME_LOGO_START,
  REMOVE_HOME_LOGO_ERROR,
} from '../../constants';

const query = gql`
  query getHomeLogo{
    getHomeLogo {
      id
      title
      name
      value
      type
    }
  }
`;

export function startLogoUploaderLoader() {
    return (dispatch, getState, {client}) => {
        dispatch({
            type: HOME_LOGO_UPLOAD_LOADER_START,
            payload: {
                homeLogoUploaderLoading: true
            }
        });
    };
}

export function stopLogoUploaderLoader() {
  return (dispatch, getState, {client}) => {
      dispatch({
          type: HOME_LOGO_UPLOAD_LOADER_STOP,
          payload: {
              homeLogoUploaderLoading: false
          }
      });
  };
}

export function doUploadLogo(fileName, filePath, oldPicture) {

  return async (dispatch, getState, { client }) => {

    dispatch({ type: LOGO_UPLOAD_START });

    try {
        

        let mutation = gql`
          mutation uploadHomeLogo($fileName: String) {
            uploadHomeLogo (fileName:$fileName) {
              status
            }
          }
        `; 

        // Send Request to create a record for logo
        const {data} = await client.mutate({
            mutation,
            variables: {fileName},
            refetchQueries: [{ query }]
        });
        
        if(data){
          dispatch({
            type: HOME_LOGO_UPLOAD_SUCCESS,
            payload: {
              homeLogoUploaderLoading: false
            }
          });
          dispatch(setSiteSettings());
          if(oldPicture != null){
            await removeLogoFile(oldPicture);
          }
          
        }
    } catch (error) {
        dispatch({
          type: HOME_LOGO_UPLOAD_ERROR,
          payload:{
            error,
            homeLogoUploaderLoading: false
          }
        });
        
      return false;
    }

    return true;
  };

}


export function doRemoveLogo(fileName) {

  return async (dispatch, getState, { client }) => {

    dispatch({ type: REMOVE_HOME_LOGO_START });
    dispatch(startLogoUploaderLoader());

    try {

      let mutation = gql`
        mutation removeHomeLogo{
          removeHomeLogo{
            status
          }
        }
      `;

      // Send Request to create a record for logo
      const {data} = await client.mutate({
        mutation,
        refetchQueries: [{ query }]
      });

      if(data){
        dispatch(setSiteSettings());
        await removeLogoFile(fileName);
        dispatch({
          type: REMOVE_HOME_LOGO_SUCCESS,
          payload: {
            homeLogoUploaderLoading: false
          }
        });
      }
      
    } catch (error) {
        dispatch({
          type: REMOVE_HOME_LOGO_ERROR,
          payload: {
            error,
            homeLogoUploaderLoading: false
          }
        });
        
      return false;
    }

    return true;
  };

}

async function removeLogoFile(fileName) {
    try {
        const resp = await fetch('/removeHomeLogoFile', {
          method: 'post',
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              fileName
          }),
          credentials: 'include',
        });

        const { status } = await resp.json();

        if(status){
          console.log('status from remove logo file', status);
        }
        
    } catch (error) {
      console.log('error from remove file', error);
        
      return false;
    }

    return true;
}