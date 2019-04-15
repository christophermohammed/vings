import * as actionTypes from '../actionTypes';

export const updateUser = (user) => {
    return{
        type: actionTypes.UPDATE_USER,
        payload: {
            user
        }
    };
}