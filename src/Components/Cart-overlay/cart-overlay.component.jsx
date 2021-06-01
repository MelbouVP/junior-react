import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import history from '../../history'

import { selectSelectedCurrency } from '../../Redux/currency/currency.selectors'

import { selectCartItems, selectCartItemCount } from '../../Redux/cart/cart.selectors'
import { 
    toggleCartOverlay,
    changeCartItemAttribute
 } from '../../Redux/cart/cart.actions'

import CartOverlayItem from '../Cart-overlay-item/cart-overlay-item.component'

import './cart-overlay.styles.scss'

export class CartOverlay extends Component {

    handleRedirect = () => {
        history.push('/cart')
        this.props.toggleCartOverlay()
    }

    createAttributesKey = (attributes) => {

        return attributes.map( attribute => {

            let attributeKey = ''

            for(let i = 0; i < attribute.name.length; i += 4){
                attributeKey += attribute.name[i]
            }

            for(let i = 0; i < attribute.value.length; i++){
                attributeKey += attribute.value[i]
            }
            
            return attributeKey
        })
        .join('')


    }


    changeSelectedAttribute = (productName,  attributes) => {

        // let attributes = attributess.chosenAttributes

        console.log(attributes)

        let newAttributeKey = this.createAttributesKey(attributes)

        this.props.changeCartItemAttribute({name: productName, attributes, newAttributeKey})

    }

    render() {

        const { cartItems, selectedCurrency, cartItemCount } = this.props

        

        const cartOverlayItemComponents = cartItems ?
            cartItems.map((item, index) => 
                <CartOverlayItem
                    key={`${index}-${item.name}`}
                    cartItem={item}
                    selectedCurrency={selectedCurrency}
                    handleChangedAttribute={this.changeSelectedAttribute}
                />
            )
        :
            null

        let cartTotal = cartItems.length ? 
            cartItems.reduce((accumulator, currentValue) => {
            
                let currency = currentValue.prices.find( price => price.currency === selectedCurrency.name)
                return (accumulator + (currency.amount*currentValue.quantity))
            },0)
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
    cartItemCount: selectCartItemCount
})

export default connect(mapStateToProps, mapDispatchToProps)(CartOverlay)
