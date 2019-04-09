import * as actionTypes from '../actionTypes';

export default function reducer(state = {}, {type, payload}) {
    switch(type){
        case actionTypes.UPDATE_USER: 
            return payload.user;
        default:
            return state;
    }
}