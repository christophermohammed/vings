import * as actionTypes from '../actionTypes';
import { setItemToAsync } from '../../logic/async';
import { convertCurrency } from '../../logic/currencies';
import defaultCurrencies from '../../data/currencies';

export default function reducer(state = {}, {type, payload}) {
    switch(type){
        case actionTypes.UPDATE_CURRENCIES:
            return payload.currencies;
            
        case actionTypes.UPDATE_RATES:
            //todo
            break;

        case actionTypes.ADD_TO_NET_SAV:
            const { amount, base } = payload;            
            let newCurrencies = defaultCurrencies.map(cur => {
                var localAmount = convertCurrency(amount, base.rate, cur.rate);
                cur.netSav += localAmount;
                return cur;
            });
            setItemToAsync("currencies", newCurrencies);
            return newCurrencies;

        case actionTypes.REMOVE_FROM_NET_SAV:
            const { amount, base } = payload;            
            let newCurrencies = defaultCurrencies.map(cur => {
                var localAmount = convertCurrency(amount, base.rate, cur.rate);
                cur.netSav -= localAmount;
                return cur;
            });
            setItemToAsync("currencies", newCurrencies);
            return newCurrencies;
        
        default:
            return state;
    }
}