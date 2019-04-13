import * as actionTypes from '../actionTypes';
import { setTransactions } from '../../utilities/async';
import { removeTransactionFromAzure } from '../../utilities/cloud';

export default function reducer(state = [], {type, payload}) {
    let transactions = JSON.parse(JSON.stringify(state));
    
    switch(type){
        case actionTypes.UPDATE_TRANSACTIONS:
            setTransactions(payload.transactions); 
            return payload.transactions;

        case actionTypes.ADD_TRANSACTION: 
            transactions.unshift(payload.transaction);
            setTransactions(transactions) 
            return transactions;

        case actionTypes.REMOVE_TRANSACTION:
            // get uid and amount  
            let uid = transactions[payload.index].uid;
            // remove from azure 
            removeTransactionFromAzure(uid);
            // remove from state
            transactions.splice(payload.index, 1);
            // set to storage
            setTransactions(transactions);
            return transactions;

        default:
            return state;
    }
}