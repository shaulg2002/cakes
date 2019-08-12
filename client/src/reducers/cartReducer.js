import {GET_CART_ITEMS, ADD_ITEM_TO_CART, DELETE_ITEM_FROM_CART, CART_ITEMS_LOADING} from '../actions/types';

const initialState = {
    items: [],
    loading: false
};

export default function(state = initialState, action){
    switch(action.type){
        case GET_CART_ITEMS:
            return{
                ...state,
                items: action.payload,
                loading: false
            };
        case DELETE_ITEM_FROM_CART:
            return {
                ...state,
                items: state.items.filter(item => item._id !== action.payload)
            };
        case ADD_ITEM_TO_CART:
            return {
                ...state,
                items: [...state.items, action.payload]
            }
        case CART_ITEMS_LOADING:
            return {
                ...state,
                loading:true
            }
        
            default:
                return state;

    }  

};