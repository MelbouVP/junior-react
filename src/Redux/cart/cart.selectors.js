import { createSelector } from 'reselect'

import { selectSelectedCurrency as selectedCurrency } from '../currency/currency.selectors'

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

// Calculate cart total based on currently selected currency
export const selectCartTotal = createSelector(
    [selectCart, selectedCurrency],
    (cart, selectedCurrency) => {
        
        return cart.cartItems.length ? 
            cart.cartItems.reduce((accumulator, currentCartItem) => {
            
                let currency = currentCartItem.prices.find( price => price.currency === selectedCurrency.name)
                return (accumulator + (currency.amount * currentCartItem.quantity))
            },0)
        :
            null
    }
)



