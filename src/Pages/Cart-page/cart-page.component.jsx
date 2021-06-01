import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { selectCartItems } from '../../Redux/cart/cart.selectors.js'
import { selectSelectedCurrency } from '../../Redux/currency/currency.selectors.js'


import CartCard from '../../Components/Cart-card/cart-card.component'

import './cart-page.styles.scss'

export class CartPage extends Component {
    render() {
        const { cartItems } = this.props
        const { selectedCurrency } = this.props

        const cartItemComponents = cartItems.length ?
            cartItems.map( (cartItem,index) => 
                <CartCard 
                    key={index} 
                    cartItem={cartItem} 
                    selectedCurrency={selectedCurrency}
                /> 
            )
        :
            null


        return (
            <div className="cart-page">
                <div className="cart-page__container">
                    <div className="cart-page__header">
                        <h1 className="header__title">
                            Cart
                        </h1>
                    </div>
                    <div className="cart-page__content">
                        {
                            cartItemComponents
                        }
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({

})

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    selectedCurrency: selectSelectedCurrency
})

export default connect(mapStateToProps, mapDispatchToProps)(CartPage)
