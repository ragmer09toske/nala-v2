import { gql } from 'react-apollo';
import { change } from 'redux-form';

import {
  STATIC_BLOCK_IMAGE_UPLOAD_START,
  STATIC_BLOCK_IMAGE_START,
  STATIC_BLOCK_IMAGE_SUCCESS,
  STATIC_BLOCK_IMAGE_ERROR,
  REMOVE_STATIC_INFO_IMAGE_START,
  REMOVE_STATIC_INFO_IMAGE_SUCCESS,
  REMOVE_STATIC_INFO_IMAGE_ERROR,
  STATIC_INFO_BLOCK_UPLOAD_LOADER_START,
  UPLOAD_STATIC_INFO_BLOCK_IMAGE_START,
  UPLOAD_STATIC_INFO_BLOCK_IMAGE_SUCCESS,
  UPLOAD_STATIC_INFO_BLOCK_IMAGE_ERROR,
  DELETE_STATIC_INFO_IMAGE_START,
  DELETE_STATIC_INFO_IMAGE_SUCCESS,
  DELETE_STATIC_INFO_IMAGE_ERROR,
  STATIC_BLOCK_IMAGE2_UPLOAD_START,
  STATIC_BLOCK_IMAGE2_SUCCESS,
  STATIC_INFO_BLOCK2_UPLOAD_LOADER_START,
  UPLOAD_STATIC_INFO_BLOCK_IMAGE2_SUCCESS,
  CARBLOCK_IMAGE_UPLOAD_START,
  COUNTERBLOCK_IMAGE_UPLOAD_START,
  CARBLOCK_IMAGE_UPLOAD_SUCCESS,
  COUNTERBLOCK_IMAGE_UPLOAD_SUCCESS
} from '../../constants';

import { getStaticBlockInfo } from './getStaticBlockInfo';

const query = gql`
query ($name: String) {
  getStaticInfo(name: $name) {
    id
    title
    name
    value
  }
}
`;

export function startStaticImageLoader() {
  return (dispatch, getState, { client }) => {
    dispatch({
      type: STATIC_BLOCK_IMAGE_UPLOAD_START,
      payload: {
        staticImageLoading: true
      }
    });
  };
}

export function startStaticImage2Loader() {
  return (dispatch, getState, { client }) => {
    dispatch({
      type: CARBLOCK_IMAGE_UPLOAD_START,
      payload: {
        loader: true
      }
    });
  };
}

export function stopStaticImageLoader() {
  return (dispatch, getState, { client }) => {
    dispatch({
      type: STATIC_BLOCK_IMAGE_UPLOAD_START,
      payload: {
        staticImageLoading: false
      }
    });
  };
}


export function doUploadStaticImage(fileName, filePath, oldPicture, name) {

  return async (dispatch, getState, { client }) => {

    dispatch({ type: STATIC_BLOCK_IMAGE_START });

    try {

      let mutation = gql`
            mutation uploadStaticBlockImage($fileName: String, $name: String) {
              uploadStaticBlockImage (fileName:$fileName, name:$name) {
                status
              }
            }
          `;

      // Send Request to create a record for logo
      const { data } = await client.mutate({
        mutation,
        variables: { fileName, filePath, name },
        refetchQueries: [{ query, variables: { name } }]
      });

      if (data) {
        await dispatch(getStaticBlockInfo());
        dispatch({
          type: STATIC_BLOCK_IMAGE_SUCCESS,
          payload: {
            staticImageLoading: false
          }
        });

        dispatch({
          type: CARBLOCK_IMAGE_UPLOAD_SUCCESS,
          payload: {
            loader: false
          }
        });
        if (oldPicture != null) {
          await removeLogoFile(oldPicture);
        }

      }
    } catch (error) {
      dispatch({
        type: STATIC_BLOCK_IMAGE_ERROR,
        payload: {
          error,
          staticImageLoading: false
        }
      });

      return false;
    }

    return true;
  };

}

export function doRemoveStaticImage(fileName, name) {

  return async (dispatch, getState, { client }) => {

    dispatch({ type: REMOVE_STATIC_INFO_IMAGE_START });
    dispatch(startStaticImageLoader());
    dispatch(change('StaticBlockForm', 'blockImage1', null));

    try {

      let mutation = gql`
        mutation removeStaticBlockImages($name: String){
          removeStaticBlockImages(name: $name){
            status
          }
        }
      `;

      // Send Request to create a record for logo
      const { data } = await client.mutate({
        mutation,
        variables: { name },
        refetchQueries: [{ query, variables: { name } }]
      });

      if (data) {
        dispatch({
          type: REMOVE_STATIC_INFO_IMAGE_SUCCESS,
          payload: {
            staticImageLoading: false
          }
        });
        await dispatch(getStaticBlockInfo());
        await removeLogoFile(fileName);
      }

    } catch (error) {
      dispatch({
        type: REMOVE_STATIC_INFO_IMAGE_ERROR,
        payload: {
          error,
          staticImageLoading: false
        }
      });

      return false;
    }

    return true;
  };

}

async function removeLogoFile(fileName) {
  try {
    const resp = await fetch('/deleteHomeBanner', {
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

    if (status) {
      console.log('status from remove logo file', status);
    }

  } catch (error) {
    console.log('error from remove file', error);

    return false;
  }

  return true;
}

export function uploadStaticImageLoader() {
  return (dispatch, getState, { client }) => {
    dispatch({
      type: STATIC_INFO_BLOCK_UPLOAD_LOADER_START,
      payload: {
        staticBlockImageLoading: true
      }
    });
  };
}

export function uploadStaticImage2Loader() {
  return (dispatch, getState, { client }) => {
    dispatch({
      type: COUNTERBLOCK_IMAGE_UPLOAD_START,
      payload: {
        loader2: true
      }
    });
  };
}

export function stopuploadStaticImageLoader() {
  return (dispatch, getState, { client }) => {
    dispatch({
      type: STATIC_INFO_BLOCK_UPLOAD_LOADER_START,
      payload: {
        staticBlockImageLoading: false
      }
    });
  };
}


export function doUploadStaticImageBlock(fileName, filePath, oldPicture, name) {

  return async (dispatch, getState, { client }) => {

    dispatch({ type: UPLOAD_STATIC_INFO_BLOCK_IMAGE_START });

    try {

      let mutation = gql`
          mutation uploadStaticBlockImage($fileName: String, $name: String) {
            uploadStaticBlockImage (fileName:$fileName, name:$name) {
              status
            }
          }
          `;

      // Send Request to create a record for logo
      const { data } = await client.mutate({
        mutation,
        variables: { fileName, filePath, name },
        refetchQueries: [{ query, variables: { name } }]
      });

      if (data) {
        // await dispatch(getStaticBlockInfo());
        dispatch({
          type: UPLOAD_STATIC_INFO_BLOCK_IMAGE_SUCCESS,
          payload: {
            staticBlockImageLoading: false
          }
        });

        dispatch({
          type: COUNTERBLOCK_IMAGE_UPLOAD_SUCCESS,
          payload: {
            loader2: false
          }
        });
        if (oldPicture != null) {
          await removeLogoFile(oldPicture);
        }

      }
    } catch (error) {
      dispatch({
        type: UPLOAD_STATIC_INFO_BLOCK_IMAGE_ERROR,
        payload: {
          error,
          staticBlockImageLoading: false
        }
      });

      return false;
    }

    return true;
  };

}

export function doRemoveStaticImageBlock(fileName, name) {

  return async (dispatch, getState, { client }) => {

    dispatch({ type: DELETE_STATIC_INFO_IMAGE_START });
    dispatch(uploadStaticImageLoader());
    dispatch(change('StaticBlockForm', 'blockImage2', null));

    try {

      let mutation = gql`
      mutation removeStaticBlockImages($name: String){
        removeStaticBlockImages(name: $name){
          status
        }
      }
      `;

      // Send Request to create a record for logo
      const { data } = await client.mutate({
        mutation,
        variables: { name },
        refetchQueries: [{ query, variables: { name } }]
      });

      if (data) {
        dispatch({
          type: DELETE_STATIC_INFO_IMAGE_SUCCESS,
          payload: {
            staticBlockImageLoading: false
          }
        });
        await dispatch(getStaticBlockInfo());
        await removeLogoFile(fileName);
      }

    } catch (error) {
      dispatch({
        type: DELETE_STATIC_INFO_IMAGE_ERROR,
        payload: {
          error,
          staticBlockImageLoading: false
        }
      });

      return false;
    }

    return true;
  };

}