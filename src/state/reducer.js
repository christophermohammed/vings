import { combineReducers } from 'redux';
import userReducer from './user/reducer';
import photosReducer from './photos/reducer';
import transactionsReducer from './transactions/reducer';

export default combineReducers({
    user: userReducer,
    photos: photosReducer,
    transactions: transactionsReducer
});