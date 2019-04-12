import * as actionTypes from '../actionTypes';

export const updateTransactions = (transaction) => async dispatch => {
    let transactions = [];
    dispatch({
        type: actionTypes.UPDATE_TRANSACTIONS,
        payload: {
            transactions
        }
    });
}