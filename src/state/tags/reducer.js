import * as actionTypes from '../actionTypes';
import { setItemToAsync } from '../../logic/async';

export default function reducer(state = [], {type, payload}) {
    let tags = JSON.parse(JSON.stringify(state));
    
    switch(type){
        case actionTypes.UPDATE_TAGS:
            setItemToAsync("tags", payload.tags); 
            return payload.tags;

        case actionTypes.ADD_TAG: 
            tags.push(payload.tag);
            setItemToAsync("tags", tags) 
            return tags;

        case actionTypes.REMOVE_TAG:
            tags.splice(payload.index, 1);
            // set to storage
            setItemToAsync("tags", tags);
            return tags;

        default:
            return state;
    }
}