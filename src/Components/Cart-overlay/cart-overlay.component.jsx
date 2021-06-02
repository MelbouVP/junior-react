import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import history from '../../history'

import { selectSelectedCurrency } from '../../Redux/currency/currency.selectors'

import { selectCartItems, selectCartItemCount, selectCartTotal } from '../../Redux/cart/cart.selectors'
import { 
    toggleCartOverlay,
    changeCartItemAttribute
 } from '../../Redux/cart/cart.actions'

import Item from '../Item/Item.component'

import './cart-overlay.styles.scss'

export class CartOverlay extends Component {

    handleRedirect = () => {
        history.push('/cart')
        this.props.toggleCartOverlay()
    }


    // changeSelectedAttribute = (productName,  attributes) => {

    //     this.props.changeCartItemAttribute({name: productName, attributes})

    // }

    render() {

        const { cartItems, selectedCurrency, cartItemCount, cartTotal } = this.props

        
        const cartOverlayItemComponents = cartItems ?
            cartItems.map((item, index) => 
                <Item
                    key={`${index}-${item.name}`}
                    cartItem={item}
                    selectedCurrency={selectedCurrency}
                    // handleChangedAttribute={this.changeSelectedAttribute}
                    hideCarousel={true}
                />
            )
        :
            null


        return (
            <div className="cart-overlay">
                <div className="cart-overlay__content">
                    <div className="content__header">
                        <p>
                            {
                                cartItemCount > 0 ?
                                    <>
                                        <span>
                                            My bag,
                                        </span>
                                        <span>
                                            {
                                                cartItemCount
                                            }
                                        </span>
                                        <span>
                                            items
                                        </span>
                                    </>
                                :
                                    <span>My bag is empty</span>
                            }
                        </p>
                    </div>

                    <div className="content__cart-items">
                        {
                            cartOverlayItemComponents
                        }
                    </div>

                    <div className="content__cart-total">
                        
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

                    <div className="content__action-buttons" onClick={this.handleRedirect}>

                        <div className="content__action" >
                            <button className="action-button view-bag-button">
                                view bag
                            </button>
                        </div>

                        <div className="content__action" >
                            <button className="action-button checkout-button">
                                checkout
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    toggleCartOverlay: () => dispatch(toggleCartOverlay()),
    changeCartItemAttribute: (newAttributeData) => dispatch(changeCartItemAttribute(newAttributeData))
})

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    selectedCurrency: selectSelectedCurrency,
    cartItemCount: selectCartItemCount,
    cartTotal: selectCartTotal
})

export default connect(mapStateToProps, mapDispatchToProps)(CartOverlay)
