import * as actionTypes from '../actionTypes';

export default function reducer(state = {}, {type, payload}) {
    switch(type){
        case actionTypes.UPDATE_TRANSACTIONS: 
            return payload.transactions;
        default:
            return state;
    }
}