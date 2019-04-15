import * as actionTypes from '../actionTypes';

export const updateRates = (rates) => {
    return{
        type: actionTypes.UPDATE_RATES,
        payload: {
            rates
        }
    };
}

export const addToNetSav = (amount) => {
    return{
        type: actionTypes.ADD_TO_NET_SAV,
        payload: {
            amount
        }
    };
}

export const removeFromNetSav = (amount) => {
    return{
        type: actionTypes.REMOVE_FROM_NET_SAV,
        payload: {
            amount
        }
    };
}
