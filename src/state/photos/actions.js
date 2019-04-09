import * as actionTypes from '../actionTypes';

export const updatePhotos = (newPhotos) => {
    dispatch({
        type: actionTypes.UPDATE_PHOTOS,
        payload: {
            Photos: newPhotos
        }
    });
}