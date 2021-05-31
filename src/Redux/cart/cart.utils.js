export const addItemToCart = (cartItems, cartItemToAdd) => {

    const existingCartItem = cartItems.find(cartItem => 
        cartItem.name === cartItemToAdd.name && 
        cartItem.selectedAttributesID === cartItemToAdd.selectedAttributesID
    )

    if(existingCartItem) {
        return cartItems.map(cartItem => 
            cartItem.name === cartItemToAdd.name && cartItem.selectedAttributesID === cartItemToAdd.selectedAttributesID ? 
                {...cartItem, quantity: cartItem.quantity + 1}
            : 
                cartItem 
        )
    } else {

        return [...cartItems, {...cartItemToAdd, quantity: 1}]
    }

}

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
    return cartItems.filter(cartItem => 
        cartItem.name !== cartItemToRemove.name && 
        cartItem.selectedAttributesID !== cartItemToRemove.selectedAttributesID
    )
}

export const incrementItem = (cartItems, cartItemToIncrement) => {
    return cartItems.map(cartItem => {

        if(
            cartItem.name === cartItemToIncrement.name &&
            cartItem.selectedAttributesID === cartItemToIncrement.selectedAttributesID
        ) {
            return {...cartItem, quantity: cartItem.quantity + 1}
        } else {
            return cartItem
        }

    })
}

export const decrementItem = (cartItems, cartItemToDecrement) => {

    const existingCartItem = cartItems.find(cartItem => 
        cartItem.id === cartItemToDecrement.id && 
        cartItem.selectedAttributesID === cartItemToDecrement.selectedAttributesID
    )

    if(existingCartItem.quantity === 1) {
        return removeItemFromCart(cartItems, existingCartItem)
    }

    return cartItems.map(cartItem => {
        
        if(
            cartItem.name === cartItemToDecrement.name &&
            cartItem.selectedAttributesID === cartItemToDecrement.selectedAttributesID
        ) {
            return {...cartItem, quantity: cartItem.quantity - 1}
        } else {
            return cartItem
        }
    })
}