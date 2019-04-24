import * as actionTypes from '../actionTypes';

export const updateTags = (tags) => {
    return{
        type: actionTypes.UPDATE_TAGS,
        payload: {
            tags
        }
    };
}

export const addTag = (tag) => {
    return{
        type: actionTypes.ADD_TAG,
        payload: {
            tag
        }
    };
}

export const removeTag = (index) => {
    return{
        type: actionTypes.REMOVE_TAG,
        payload: {
            index
        }
    };
}
