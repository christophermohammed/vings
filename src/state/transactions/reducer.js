import * as actionTypes from '../actionTypes';
import { setTransactions } from '../../utilities/async';

export default function reducer(state = [], {type, payload}) {
    switch(type){
        case actionTypes.UPDATE_TRANSACTIONS:
            setTransactions(payload.transactions); 
            return payload.transactions;
        case actionTypes.ADD_TRANSACTION: 
            let transactions = state;
            transactions.unshift(payload.transaction);
            setTransactions(transactions) 
            return transactions;
        default:
            return state;
    }
}