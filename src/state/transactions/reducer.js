import * as actionTypes from '../actionTypes';
import { setTransactions } from '../../utilities/async';
import { removeTransactionFromAzure } from '../../utilities/cloud';
import { removeFromUserNetSav } from '../user/actions';

export default function reducer(state = [], {type, payload}) {
    let transactions = state;
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
            let amt = transactions[payload.index].amount;
            // adjust user netsav
            removeFromUserNetSav(amt);
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