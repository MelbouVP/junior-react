import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import history from '../../history'

import { selectSelectedCurrency } from '../../Redux/currency/currency.selectors'

import { 
    selectCartItems, 
    selectCartItemCount, 
    selectCartTotal 
} from '../../Redux/cart/cart.selectors'

import { 
    toggleCartOverlay,
    changeCartItemAttribute
 } from '../../Redux/cart/cart.actions'

import Item from '../Item/Item.component'

import './cart-overlay.styles.scss'

export class CartOverlay extends Component {

    // This component is responsible for rendering minicart and cart item cards
    

    handleRedirect = () => {
        history.push('/cart')

        // hide minicart when redirecting user to cart page
        this.props.toggleCartOverlay()
    }

    render() {

        // data is received from redux state
        const { cartItems, selectedCurrency, cartItemCount, cartTotal } = this.props

        // 1.Pass user cart items to create individual cart item in the minicart
        // 2.Key attribute is combination of product name and array index 
        // because products don't have unique properties such as ID's that can be used 
        // to differentiate components if they are removed from DOM
        // 3.Item component has child component ProductAttribute that contains labels
        // Provide random label value to identify child components that belong to particular 
        // Item component instance (Item component is used multiple times in application)
        const cartOverlayItemComponents = cartItems ?
            cartItems.map((item, index) => 
                <Item
                    key={`${item.name}_${index}`}
                    cartItem={item}
                    selectedCurrency={selectedCurrency}
                    hideCarousel={true}
                    labelValue={(Math.ceil(Math.random()*100))}
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
