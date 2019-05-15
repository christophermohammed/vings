import * as actionTypes from '../actionTypes';

export const updatePhotos = (photos) => {
    return{
        type: actionTypes.UPDATE_PHOTOS,
        payload: {
            photos
        }
    }
}