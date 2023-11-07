import {
  IMAGE_LIGHTBOX_OPEN,
  IMAGE_LIGHTBOX_CLOSE,
} from '../constants';

export function openImageLightBox(current) {
    return async (dispatch) => {
        dispatch({
            type: IMAGE_LIGHTBOX_OPEN,
            imageLightBox: true,
            currentIndex:current  
        });

        return true;
    };
}

export function closeImageLightBox() {
    return async (dispatch) => {
        dispatch({
            type: IMAGE_LIGHTBOX_CLOSE,
            imageLightBox: false
        });

        return true;
    };
}
