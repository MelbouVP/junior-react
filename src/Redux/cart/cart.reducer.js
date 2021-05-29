import CartActionTypes from './cart.types';

export const INITIAL_STATE = {
    cartOverlayHidden: true,
    cartItems: [],
    error: null
}

const cartReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        default:
            return state;
    }
}

export default cartReducer;