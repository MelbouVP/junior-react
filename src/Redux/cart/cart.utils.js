export const addItemToCart = (cartItems, cartItemToAdd) => {

    console.log(cartItems, cartItemToAdd)

    const existingCartItem = cartItems.find(cartItem => 
        cartItem.name === cartItemToAdd.name
    )

    if(existingCartItem) {
        return cartItems.map(cartItem => {

            if(
                cartItem.name === cartItemToAdd.name && 
                cartItem.selectedAttributesID === cartItemToAdd.selectedAttributesID
            ){

                return {...cartItem, quantity: cartItem.quantity + 1}
            } else if (
                cartItem.name === cartItemToAdd.name && 
                cartItem.selectedAttributesID !== cartItemToAdd.selectedAttributesID
            ){
                return {...cartItemToAdd, quantity: 1 }
            }   else {
                return cartItem
            }

        })
    } else {

    }
    return [...cartItems, {...cartItemToAdd, quantity: 1}]

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

export const changeCartItemAttribute = (cartItems, cartItemToChange) => {
    const existingCartItem = cartItems.find(cartItem => 
        cartItem.name === cartItemToChange.name
    )

    // let newAttributeKey = createAttributesKey(cartItemToChange.attributes)


    return cartItems.map( cartItem => {

        if(cartItem.name === existingCartItem.name){
            return {
                ...existingCartItem, 
                selectedAttributes: cartItemToChange.attributes,
                selectedAttributesID: cartItemToChange.newAttributeKey,
                quantity: 1
            }
        } else {
            return cartItem
        }
    })
}

// const createAttributesKey = (attributes) => {

//     return attributes.map( attribute => {

//         let attributeKey = ''

//         for(let i = 0; i < attribute.name.length; i += 4){
//             attributeKey += attribute.name[i]
//         }

//         for(let i = 0; i < attribute.value.length; i++){
//             attributeKey += attribute.value[i]
//         }
        
//         return attributeKey
//     })
//     .join('')
// }