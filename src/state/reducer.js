import { combineReducers } from 'redux';
import userReducer from './user/reducer';
import photosReducer from './photos/reducer';

export default combineReducers({
    user: userReducer,
    photos: photosReducer
});