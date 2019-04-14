import * as actionTypes from '../actionTypes';
import { setUser } from '../../utilities/async';

export default function reducer(state = {}, {type, payload}) {
    let user = JSON.parse(JSON.stringify(state));
    switch(type){
        case actionTypes.UPDATE_USER:
            setUser(payload.user); 
            return payload.user;
        case actionTypes.ADD_TO_USER_NET_SAV:
            user.netSav += payload.amt;
            setUser(user);
            return user;
        case actionTypes.REMOVE_FROM_USER_NET_SAV:
            user.netSav -= payload.amt;
            setUser(user);
            return user;
        case actionTypes.UPDATE_CURRENCY:
            user.currency = payload.cur;
            setUser(user);
            return user;
        default:
            return state;
    }
}