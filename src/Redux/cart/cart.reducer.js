import CartActionTypes from './cart.types';

import { addItemToCart } from './cart.utils'

export const INITIAL_STATE = {
    cartOverlayHidden: true,
    cartItems: [],
    // [{
    //     "name": "iPhone 12 Pro",
    //     "prices": [
    //         {
    //             "currency": "USD",
    //             "amount": 1000.76
    //         },
    //         {
    //             "currency": "GBP",
    //             "amount": 719.34
    //         },
    //         {
    //             "currency": "AUD",
    //             "amount": 1290.99
    //         },
    //         {
    //             "currency": "JPY",
    //             "amount": 108074.6
    //         },
    //         {
    //             "currency": "RUB",
    //             "amount": 75680.48
    //         }
    //     ],
    //     "gallery": [
    //         "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-pro-family-hero?wid=940&amp;hei=1112&amp;fmt=jpeg&amp;qlt=80&amp;.v=1604021663000"
    //     ],
    //     "attributes": [
    //         {
    //             "id": "Capacity",
    //             "name": "Capacity",
    //             "type": "text",
    //             "items": [
    //                 {
    //                     "displayValue": "512G",
    //                     "value": "512G",
    //                     "id": "512G"
    //                 },
    //                 {
    //                     "displayValue": "1T",
    //                     "value": "1T",
    //                     "id": "1T"
    //                 }
    //             ]
    //         },
    //         {
    //             "id": "Color",
    //             "name": "Color",
    //             "type": "swatch",
    //             "items": [
    //                 {
    //                     "displayValue": "Green",
    //                     "value": "#44FF03",
    //                     "id": "Green"
    //                 },
    //                 {
    //                     "displayValue": "Cyan",
    //                     "value": "#03FFF7",
    //                     "id": "Cyan"
    //                 },
    //                 {
    //                     "displayValue": "Blue",
    //                     "value": "#030BFF",
    //                     "id": "Blue"
    //                 },
    //                 {
    //                     "displayValue": "Black",
    //                     "value": "#000000",
    //                     "id": "Black"
    //                 },
    //                 {
    //                     "displayValue": "White",
    //                     "value": "#FFFFFF",
    //                     "id": "White"
    //                 }
    //             ]
    //         }
    //     ],
    //     "selectedAttributes": [
    //         {
    //             "name": "capacity",
    //             "value": "1T"
    //         },
    //         {
    //             "name": "color",
    //             "value": "#03FFF7"
    //         }
    //     ],
    //     "selectedAttributesID": "pacity+1Tlor+#03FFF7",
    //     "quantity": 1
    // }],
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
                cartItems: [...action.payload]
            }
        case CartActionTypes.DECREMENT_ITEM:
            return {
                ...state,
                cartItems: [...action.payload]
            }
        default:
            return state;
    }
}

export default cartReducer;