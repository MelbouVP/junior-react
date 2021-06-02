import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { selectSelectedCurrency } from '../../Redux/currency/currency.selectors.js'

import { selectCartItems, selectCartTotal } from '../../Redux/cart/cart.selectors.js'
import { changeCartItemAttribute } from '../../Redux/cart/cart.actions'

import Item from '../../Components/Item/Item.component'

import './cart-page.styles.scss'

export class CartPage extends Component {


    render() {
        const { cartItems, cartTotal, selectedCurrency } = this.props

        const cartItemComponents = cartItems.length ?
            cartItems.map( (cartItem,index) => 
                <Item
                    key={`${cartItem.name}+${index}`} 
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
                            cartItems.length ?
                                cartItemComponents
                            :
                                <div className="cart-page__cart-empty"> Cart is empty</div>
                        }

                    </div>

                    <div className="cart-page__cart-total">
                        
                        {
                            cartItems.length ?
                                <>
                                    <h4>Total:</h4>

                                    <div>
                                        <span>
                                            {
                                                this.props.selectedCurrency.symbol
                                            } 
                                        </span>

                                        <span>
                                            {
                                                cartTotal.toFixed(2)
                                            }
                                        </span>
                                    </div>
                                </>
                            :
                                null
                        }

                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    changeCartItemAttribute: (newAttributeData) => dispatch(changeCartItemAttribute(newAttributeData))
})

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    selectedCurrency: selectSelectedCurrency,
    cartTotal: selectCartTotal
})

export default connect(mapStateToProps, mapDispatchToProps)(CartPage)
