import * as actionTypes from '../actionTypes';
import { setItemToAsync } from '../../logic/async';

export default function reducer(state = {}, {type, payload}) {
    let user = JSON.parse(JSON.stringify(state));
    switch(type){
        case actionTypes.UPDATE_USER:
            user = payload.user || {};
            setItemToAsync("user", user); 
            return user;
        case actionTypes.UPDATE_CURRENCY_CODE:
            user.currencyCode = payload.code;
            setItemToAsync("user", user || {});
            return user;
        default:
            return state;
    }
}