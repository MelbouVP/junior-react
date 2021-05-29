import CartActionTypes from './cart.types';

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
        default:
            return state;
    }
}

export default cartReducer;