import { gql } from 'react-apollo';

import {
  STATIC_BLOCK_INFO_START,
  STATIC_BLOCK_INFO_SUCCESS,
  STATIC_BLOCK_INFO_ERROR
} from '../../constants';

const query = gql`
{
  getStaticInfo {
      id
      title
      name
      value
    }
}
`;

export function getStaticBlockInfo() {

  return async (dispatch, getState, { client }) => {

    dispatch({
      type: STATIC_BLOCK_INFO_START,
    });

    try {
      let settingsData = {};
      const { data } = await client.query({
        query,
        fetchPolicy: 'network-only'
      });
      if (data && data.getStaticInfo) {
        data.getStaticInfo.map((item, key) => {
          settingsData[item.name] = item.value
        });

        dispatch({
          type: STATIC_BLOCK_INFO_SUCCESS,
          payload: {
            data: settingsData
          }
        });

      } else {
        dispatch({
          type: STATIC_BLOCK_INFO_ERROR,
        });
      }
    } catch (error) {
      dispatch({
        type: STATIC_BLOCK_INFO_ERROR,
        payload: {
          error
        }
      });
      return false;
    }

    return true;
  };
}
