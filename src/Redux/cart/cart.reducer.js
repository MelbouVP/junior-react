import CartActionTypes from './cart.types';

import { addItemToCart, changeCartItemAttribute, incrementItem, decrementItem } from './cart.utils'

export const INITIAL_STATE = {
    cartOverlayHidden: true,
    cartItems: [],
    error: null
}

const cartReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case CartActionTypes.TOGGLE_CART_OVERLAY:
            return {
                ...state,
                cartOverlayHidden: !state.cartOverlayHidden
            }
        case CartActionTypes.ADD_ITEM:
            return {
                ...state,
                cartItems: addItemToCart(state.cartItems, action.payload)
            }
        case CartActionTypes.REMOVE_ITEM:
            return {
                ...state,
                cartItems: [...action.payload]
            }
        case CartActionTypes.INCREMENT_ITEM:
            return {
                ...state,
                cartItems: incrementItem(state.cartItems, action.payload)
            }
        case CartActionTypes.DECREMENT_ITEM:
            return {
                ...state,
                cartItems: decrementItem(state.cartItems, action.payload)
            }
        case CartActionTypes.CHANGE_CART_ITEM_ATTRIBUTE:
            return {
                ...state,
                cartItems: changeCartItemAttribute(state.cartItems, action.payload)
            }
        default:
            return state;
    }
}

export default cartReducer;