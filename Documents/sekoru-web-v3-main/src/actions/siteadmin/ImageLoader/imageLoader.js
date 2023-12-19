export function getImageLoader(actionType, data) {

  return async (dispatch, getState, { client }) => {

    dispatch({
        type: actionType,
        payload: {
            loader: data
        }
      });

  };

}
