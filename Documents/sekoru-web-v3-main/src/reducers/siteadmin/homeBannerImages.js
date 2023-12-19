import {
  GET_HOME_BANNER_START,
  GET_HOME_BANNER_SUCCESS,
  GET_HOME_BANNER_ERROR,
  STATIC_BLOCK_IMAGE_UPLOAD_START,
  STATIC_BLOCK_IMAGE_SUCCESS,
  STATIC_BLOCK_IMAGE_ERROR,
  REMOVE_STATIC_INFO_IMAGE_SUCCESS,
  REMOVE_STATIC_INFO_IMAGE_ERROR,
  STATIC_INFO_BLOCK_UPLOAD_LOADER_START,
  STATIC_INFO_BLOCK2_UPLOAD_LOADER_START,
  UPLOAD_STATIC_INFO_BLOCK_IMAGE_SUCCESS,
  UPLOAD_STATIC_INFO_BLOCK_IMAGE_ERROR,
  DELETE_STATIC_INFO_IMAGE_SUCCESS,
  DELETE_STATIC_INFO_IMAGE_ERROR,
  STATIC_BLOCK_INFO_SUCCESS,
  STATIC_BLOCK_IMAGE2_SUCCESS,
  STATIC_BLOCK_IMAGE2_UPLOAD_START,
  CARBLOCK_IMAGE_UPLOAD_START,
  COUNTERBLOCK_IMAGE_UPLOAD_START,
  CARBLOCK_IMAGE_UPLOAD_SUCCESS,
  COUNTERBLOCK_IMAGE_UPLOAD_SUCCESS,
  GET_HOME_START,
  GET_HOME_SUCCESS,
  GET_HOME_ERROR,
} from '../../constants';

export default function homeBannerImages(state = {}, action) {
  switch (action.type) {

    case GET_HOME_BANNER_START:
      return {
        ...state,
      };
    case CARBLOCK_IMAGE_UPLOAD_START:
      return {
        ...state,
        loader: action.payload.loader
      }
    case COUNTERBLOCK_IMAGE_UPLOAD_START:
      return {
        ...state,
        loader2: action.payload.loader2
      }

    case CARBLOCK_IMAGE_UPLOAD_SUCCESS:
      return {
        ...state,
        loader: action.payload.loader
      }

    case COUNTERBLOCK_IMAGE_UPLOAD_SUCCESS:
      return {
        ...state,
        loader2: action.payload.loader2
      }

    case GET_HOME_BANNER_SUCCESS:
      return {
        ...state,
        data: action.data.getHomeBanner,
      };

    case GET_HOME_BANNER_ERROR:
      return {
        ...state,
      };

    case STATIC_BLOCK_IMAGE_UPLOAD_START:
      return {
        ...state,
        staticImageLoading: action.payload.staticImageLoading,
      };

    case STATIC_BLOCK_IMAGE2_UPLOAD_START:
      return {
        ...state,
        staticImageLoading2: action.payload.staticImageLoading2,
      };

    case STATIC_BLOCK_IMAGE_SUCCESS:
      return {
        ...state,
        staticImageLoading: action.payload.staticImageLoading,
      };

    case STATIC_BLOCK_IMAGE2_SUCCESS:
      return {
        ...state,
        staticImageLoading2: action.payload.staticImageLoading2,
      };

    case STATIC_BLOCK_IMAGE_SUCCESS:
      return {
        ...state,
        staticImageLoading: action.payload.staticImageLoading,
      };

    case STATIC_BLOCK_IMAGE_ERROR:
      return {
        ...state,
        staticImageLoading: action.payload.staticImageLoading,
      };

    case REMOVE_STATIC_INFO_IMAGE_SUCCESS:
      return {
        ...state,
        staticImageLoading: action.payload.staticImageLoading
      };

    case REMOVE_STATIC_INFO_IMAGE_ERROR:
      return {
        ...state,
        staticImageLoading: action.payload.staticImageLoading,
      };

    case STATIC_INFO_BLOCK_UPLOAD_LOADER_START:
      return {
        ...state,
        staticBlockImageLoading: action.payload.staticBlockImageLoading,
      };

    case STATIC_INFO_BLOCK2_UPLOAD_LOADER_START:
      return {
        ...state,
        staticBlockImageLoading2: action.payload.staticBlockImageLoading,
      };

    case UPLOAD_STATIC_INFO_BLOCK_IMAGE_SUCCESS:
      return {
        ...state,
        staticBlockImageLoading: action.payload.staticBlockImageLoading,
      };

    case UPLOAD_STATIC_INFO_BLOCK_IMAGE_ERROR:
      return {
        ...state,
        staticBlockImageLoading: action.payload.staticBlockImageLoading,
      };

    case DELETE_STATIC_INFO_IMAGE_SUCCESS:
      return {
        ...state,
        staticBlockImageLoading: action.payload.staticBlockImageLoading
      };

    case DELETE_STATIC_INFO_IMAGE_ERROR:
      return {
        ...state,
        staticBlockImageLoading: action.payload.staticBlockImageLoading,
      };

    case STATIC_BLOCK_INFO_SUCCESS:
      return {
        ...state,
        blockData: action.payload.data,
      };

    case GET_HOME_START:
      return {
        ...state,
      };

    case GET_HOME_SUCCESS:
      return {
        ...state,
        data: action.data,
      };

    case GET_HOME_ERROR:
      return {
        ...state,
      };

    default:
      return state;
  }
}
