import * as actionTypes from '../actionTypes';
import { setItemToAsync } from '../../utilities/async';
import { currencies } from '../../utilities/currencies';

export default function reducer(state = {}, {type, payload}) {
    let newCurrencies = JSON.parse(JSON.stringify(currencies));
    switch(type){
        case actionTypes.UPDATE_RATES:
            //todo
            break;
        case actionTypes.ADD_TO_NET_SAV:
            user.netSav += payload.amt;
            setItemToAsync(user);
            return user;
        case actionTypes.REMOVE_FROM_NET_SAV:
            user.netSav -= payload.amt;
            setItemToAsync(user);
            return user;
        default:
            return state;
    }
}