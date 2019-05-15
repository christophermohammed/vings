import * as actionTypes from '../actionTypes';
import { setItemToAsync } from '../../logic/async';
import { convertCurrency } from '../../logic/currencies';

export default function reducer(state = [], {type, payload}) {
    let newCurrencies = JSON.parse(JSON.stringify(state));
    switch(type){
        case actionTypes.UPDATE_CURRENCIES:
            setItemToAsync("currencies", payload.currencies);
            return payload.currencies;
            
        case actionTypes.UPDATE_RATES:
            const { rates } = payload;
            for(var i = 0; i < newCurrencies.length; i++){
                if(newCurrencies[i].code === rates[i].RowKey){
                    newCurrencies[i].rate = rates[i].Rate;
                }
            }
            setItemToAsync("currencies", newCurrencies);
            return newCurrencies;

        case actionTypes.ADD_TO_NET_SAV:
            newCurrencies = state.map(cur => {
                var localAmount = convertCurrency(payload.amount, payload.base && payload.base.rate, cur.rate);
                cur.netSav += localAmount;
                return cur;
            });
            setItemToAsync("currencies", newCurrencies);
            return newCurrencies;

        case actionTypes.REMOVE_FROM_NET_SAV:
            newCurrencies = state.map(cur => {
                var localAmount = convertCurrency(payload.amount, payload.base && payload.base.rate, cur.rate);
                cur.netSav -= localAmount;
                return cur;
            });
            setItemToAsync("currencies", newCurrencies);
            return newCurrencies;
        
        default:
            return state;
    }
}