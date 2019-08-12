import axios from 'axios';
import {GET_CART_ITEMS, ADD_ITEM_TO_CART, DELETE_ITEM_FROM_CART, CART_ITEMS_LOADING} from './types';
import {returnErrors} from './errorActions';
import {tokenConfig} from './authActions';

export const getCartItems = () => dispatch => {
    dispatch(setCartItemsLoading());
    axios
     .get('/api/cart')
     .then(res => 
        dispatch({
            type: GET_CART_ITEMS,
            payload: res.data
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status )));
}

export const addItemToCart = (id) => (dispatch,getStates) => {
    axios
     .post(`/api/cart/${id}`, tokenConfig(getStates))
     .then(res => 
        dispatch({
            type: ADD_ITEM_TO_CART,
            payload: res.data
    }))
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status )));
}

export const deleteItemFromCart = (id) => (dispatch, getStates) => {
    axios
     .delete(`/api/items/${id}`, tokenConfig(getStates))
     .then(res => dispatch({
         type: DELETE_ITEM_FROM_CART,
         payload: id
     }))
     .catch(err => dispatch(returnErrors(err.response.data, err.response.status )));
   
}

export const setCartItemsLoading = () => {
    return{
        type: CART_ITEMS_LOADING
    };
};