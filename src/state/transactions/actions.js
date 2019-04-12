import * as actionTypes from '../actionTypes';

export const updateTransactions = (transactions) => {
    return{
        type: actionTypes.UPDATE_TRANSACTIONS,
        payload: {
            transactions
        }
    };
}

export const addTransaction = (transaction) => {
    return{
        type: actionTypes.ADD_TRANSACTION,
        payload: {
            transaction
        }
    };
}