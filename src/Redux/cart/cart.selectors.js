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

export const selectCartTotal = createSelector(
    [selectCart, selectedCurrency],
    (cart, selectedCurrency) => {
        
        return cart.cartItems.length ? 
            cart.cartItems.reduce((accumulator, currentValue) => {
            
                let currency = currentValue.prices.find( price => price.currency === selectedCurrency.name)
                return (accumulator + (currency.amount*currentValue.quantity))
            },0)
        :
            null
    }
)



