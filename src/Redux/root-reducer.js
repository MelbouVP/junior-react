import { combineReducers } from 'redux';

import cartReducer from './cart/cart.reducer'
import currencyReducer from './currency/currency.reducer'
import shopReducer from './shop/shop.reducer'

const rootReducer = combineReducers({
    cart: cartReducer,
    currency: currencyReducer,
    shop: shopReducer
})

export default rootReducer;