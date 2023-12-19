import {
    IMAGE_LOADER1_START,
    IMAGE_LOADER1_SUCCESS
} from '../../constants/index'

export default function image(state ={}, action) {
    switch (action.type) {
        case IMAGE_LOADER1_START:
            return {
                ...state,
                loader: action.payload.loader
            }

        case IMAGE_LOADER1_SUCCESS:
            return {
                ...state,
                loader: action.payload.loader
            }
            
        default:
            return state;
    }
}