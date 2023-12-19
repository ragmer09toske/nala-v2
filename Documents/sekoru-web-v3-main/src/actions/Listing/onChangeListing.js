import {
    ON_CHANGE_LISTING_START,
    ON_CHANGE_LISTING_FILTER_START
} from '../../constants';
export function onChangeListing(listValue) {
    return (dispatch, getState) => {
        dispatch({
            type: ON_CHANGE_LISTING_START,
            onChangeListingId: listValue
        });
    };
}
export function onChangeListingFilter({ listId, orderBy, startDate, endDate, payoutId }) {
    return (dispatch, getState) => {
        dispatch({
            type: ON_CHANGE_LISTING_FILTER_START,
            listId,
            orderBy,
            startDate,
            endDate,
            payoutId
        });
    };
}