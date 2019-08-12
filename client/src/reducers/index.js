import { combineReducers } from 'redux';
import itemReducer from './itemReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import cartReducer from './cartReducer';


export default combineReducers({
    item: itemReducer,
    error: errorReducer,
    auth: authReducer,
    cartItem: cartReducer
});