import { createSelector } from 'reselect'

const selectCart = state => state.cart

export const selectCartOverlayHidden = createSelector(
    [selectCart],    
    cart => cart.cartOverlayHidden
);



