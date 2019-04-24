import * as actionTypes from '../actionTypes';

export const updateCurrencies = (currencies) => {
    return{
        type: actionTypes.UPDATE_CURRENCIES,
        payload: {
            currencies
        }
    };
}

export const updateRates = (rates) => {
    return{
        type: actionTypes.UPDATE_RATES,
        payload: {
            rates
        }
    };
}

export const addToNetSav = (amount, base) => {
    return{
        type: actionTypes.ADD_TO_NET_SAV,
        payload: {
            amount,
            base
        }
    };
}

export const removeFromNetSav = (amount, base) => {
    return{
        type: actionTypes.REMOVE_FROM_NET_SAV,
        payload: {
            amount,
            base
        }
    };
}
