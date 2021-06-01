import { createSelector } from 'reselect'

const selectCart = state => state.cart

export const selectCartItems = createSelector(
    [selectCart],    
    cart => cart.cartItems
);

export const selectCartItemCount = createSelector(
    [selectCart],    
    cart => cart.cartItems.length
);

export const selectCartOverlayHidden = createSelector(
    [selectCart],    
    cart => cart.cartOverlayHidden
);



