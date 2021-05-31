import CartActionTypes from './cart.types';

export const toggleCartOverlay = () => ({
    type: CartActionTypes.TOGGLE_CART_OVERLAY
})

export const addItem = (item) => ({
    type: CartActionTypes.ADD_ITEM,
    payload: item
})

export const removeItem = (item) => ({
    type: CartActionTypes.REMOVE_ITEM,
    payload: item
})

export const incrementItem = (item) => ({
    type: CartActionTypes.INCREMENT_ITEM,
    payload: item
})

export const decrementItem = (item) => ({
    type: CartActionTypes.DECREMENT_ITEM,
    payload: item
})