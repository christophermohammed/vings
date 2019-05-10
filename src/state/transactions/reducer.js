import * as actionTypes from '../actionTypes';
import { setItemToAsync } from '../../logic/async';
import { removeTransactionFromAzure } from '../../logic/cloud';

export default function reducer(state = [], {type, payload}) {
    let transactions = JSON.parse(JSON.stringify(state));
    
    switch(type){
        case actionTypes.UPDATE_TRANSACTIONS:
            setItemToAsync("transactions", payload.transactions); 
            return payload.transactions;

        case actionTypes.ADD_TRANSACTION: 
            transactions.unshift(payload.transaction);
            setItemToAsync("transactions", transactions) 
            return transactions;

        case actionTypes.REMOVE_TRANSACTION:
            // get uid and amount  
            let uid = transactions[payload.index].uid;
            // remove from azure 
            removeTransactionFromAzure(uid);
            // remove from state
            transactions.splice(payload.index, 1);
            // set to storage
            setItemToAsync("transactions", transactions);
            return transactions;

        case actionTypes.REMOVE_TAG_FROM_TRANSACTIONS:
            transactions = transactions.map(tr => {
                tr.tags = tr.tags.filter(tag => {
                    if(tag.name === payload.tag.name && tag.color === payload.tag.color){
                        return false;
                    }
                    return true;
                });
                return tr;
            });
            return transactions;

        default:
            return state;
    }
}