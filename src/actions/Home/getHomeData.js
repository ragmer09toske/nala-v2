import { gql } from 'react-apollo';

import {
  GET_HOME_START,
  GET_HOME_SUCCESS,
  GET_HOME_ERROR
} from '../../constants';

const query = gql`{
  getHomeData {
    result {
      id
      title
      content
      getFindYouCar{
        id
        name
        value
      }
      getBanner{
        image
      }
    }
  }
}
`;

export function getHomeData() {

  return async (dispatch, getState, { client }) => {

    dispatch({
      type: GET_HOME_START,
    });

    try {
      const {data} = await client.query({
        query,
        fetchPolicy: 'network-only'
      });
      
      dispatch({
        type: data && data.getHomeData && data.getHomeData.result ?  GET_HOME_SUCCESS : GET_HOME_ERROR,
        data: data && data.getHomeData && data.getHomeData.result ? data.getHomeData.result : []
      });
    
    } catch (error) {
      dispatch({
        type: GET_HOME_ERROR,
        payload:{
          error
        }
      });
      return false;
    }

    return true;
  };
}
