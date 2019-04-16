import * as actionTypes from '../actionTypes';
import { setItemToAsync } from '../../utilities/async';

export default function reducer(state = {}, {type, payload}) {
    let user = JSON.parse(JSON.stringify(state));
    switch(type){
        case actionTypes.UPDATE_USER:
            setItemToAsync("user", payload.user); 
            return payload.user;
        case actionTypes.UPDATE_CURRENCY:
            user.currencyCode = payload.code;
            setItemToAsync("user", user);
            return user;
        default:
            return state;
    }
}