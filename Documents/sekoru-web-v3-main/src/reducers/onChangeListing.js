import {
    ON_CHANGE_LISTING_START,
    ON_CHANGE_LISTING_FILTER_START
} from '../constants';
export default function onChangeListing(state = {}, action) {
    switch (action.type) {
        case ON_CHANGE_LISTING_START:
            return {
                ...state,
                onChangeListingId: action.onChangeListingId
            };

        case ON_CHANGE_LISTING_FILTER_START:
            return {
                ...state,
                listId: action.listId,
                orderBy: action.orderBy,
                startDate: action.startDate,
                endDate: action.endDate,
                payoutId:action.payoutId
            }
        default:
            return {
                ...state,
            };
    }
}
