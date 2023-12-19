import {
  ADMIN_LOAD_LIST_SETTINGS_START,
  ADMIN_LOAD_LIST_SETTINGS_SUCCESS,
  GET_ADMIN_USER_START,
  ADMIN_PRIVILEGES_SUCCESS
} from '../../constants';

export default function listSettings(state = {}, action) {
  switch (action.type) {
    case ADMIN_LOAD_LIST_SETTINGS_SUCCESS:
      return {
        ...state,
        data: action.data,
      };
    case GET_ADMIN_USER_START:
      return {
        ...state,
      };
    case ADMIN_PRIVILEGES_SUCCESS:
      return {
        ...state,
        privileges: action.payload.privileges,
      };
    default:
      return state;
  }
}
