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

export const removeTransaction = (index) => {
    return{
        type: actionTypes.REMOVE_TRANSACTION,
        payload: {
            index
        }
    };
}

export const removeTagFromTransactions = (tag) => {
    return{
        type: actionTypes.REMOVE_TAG_FROM_TRANSACTIONS,
        payload: {
            tag
        }
    };
}