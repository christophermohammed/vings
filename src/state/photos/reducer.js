import * as actionTypes from '../actionTypes';

export default function reducer(state = {}, {type, payload}) {
    switch(type){
        case actionTypes.UPDATE_PHOTOS: 
            return payload.photos;
        default:
            return state;
    }
}