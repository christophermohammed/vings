import { combineReducers } from 'redux';
import userReducer from './user/reducer';
import photosReducer from './photos/reducer';
import transactionsReducer from './transactions/reducer';
import currencyReducer from './currencies/reducer';
import tagsReducer from './tags/reducer';

export default combineReducers({
    user: userReducer,
    photos: photosReducer,
    transactions: transactionsReducer,
    currencies: currencyReducer,
    tags: tagsReducer
});