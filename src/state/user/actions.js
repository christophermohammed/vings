import * as actionTypes from '../actionTypes';

export const updateUser = (user) => {
    return{
        type: actionTypes.UPDATE_USER,
        payload: {
            user
        }
    };
}

export const addToUserNetSav = (amt) => {
    return{
        type: actionTypes.ADD_TO_USER_NET_SAV,
        payload: {
            amt
        }
    };
}

export const removeFromUserNetSav = (amt) => {
    return{
        type: actionTypes.REMOVE_FROM_USER_NET_SAV,
        payload: {
            amt
        }
    };
}

export const updateCurrency = (cur) => {
    return{
        type: actionTypes.UPDATE_CURRENCY,
        payload: {
            cur
        }
    };
}