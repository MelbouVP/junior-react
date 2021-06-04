import React, { Component } from 'react'
import { connect } from 'react-redux'
import { incrementItem, decrementItem, changeCartItemAttribute } from '../../Redux/cart/cart.actions'

import ProductAttribute from '../Product-attribute/product-attribute.component'
import Carousel from '../Carousel/carousel.component'

import './item.styles.scss'

export class Item extends Component {

    // This component is responsible for 
    // rendering information about individual product (parent components - cart overlay and cart page)
    // and sending changes to selected attributes to the redux state

    // Part of default styling of this component and also child component - ProductAttribute are overwritten in parent components to fit design needs of each parent component.


    // Send information about selected attributes for product to the app state
    changeSelectedAttribute = (productName, attributes) => {

        this.props.changeCartItemAttribute({name: productName, attributes})

    }

    // Receive data about selected attribute for product from child component 
    getChosenAttributes = (newValue, attributeName) => {

        // Selected attributes are specified for the product when it is added to cart
        const { selectedAttributes, name } = this.props.cartItem
        
        // Check which attributes were changed
        // and updateattribute with new value
        let updatedAttributes = selectedAttributes
                .map( prevAttribute => {               
                    if(prevAttribute.name === attributeName){
                        return {
                            ...prevAttribute,
                            value: newValue
                        }
                    } else {
                        return prevAttribute
                    }
        })

        this.changeSelectedAttribute(name, updatedAttributes)


    }

    // Send information about product that has to be incremented to the app state
    handleIncrement = () => {
        this.props.incrementItem(this.props.cartItem)
    }

    handleDecrement = () => {
        this.props.decrementItem(this.props.cartItem)
    }


    render() {

        // Data is received from either Cart overlay component or Cart page component
        const { name, prices, gallery, selectedAttributes, attributes, quantity } = this.props.cartItem || {}
        
        // Get product price based on selected currency
        const price = this.props.selectedCurrency && prices ? 
            prices.find( price => price.currency === this.props.selectedCurrency.name )
        :   
            null

        
        // 1.Create product attribute for each of the attributes
        // 2.Provide selected attribute as attribute that is checked/selected when component is rendered
        // Product name is used to create unique labels  
        // 3.Provide random label value to differentiate each product attribute label
        // if Item component is called multiple times on the same page,
        // labelValue must come from parent to differentiate instances of Item component 
        // (Page overlay has to be disabled and cart overlay must be toggled on at cart page to see the effects )
        const productAttributesList = attributes ? 
            attributes.map( (attribute,index) => 
                    <ProductAttribute 
                        key={`${name}+${index}`}
                        attribute={attribute} 
                        sendChosenAttributes={this.getChosenAttributes}
                        selectedAttribute={selectedAttributes[index]}
                        label={{ productName: name, labelValue: this.props.labelValue ? this.props.labelValue : (Math.ceil(Math.random()*100)) }}
                    />
                )
        : 
            null
        
        return (
            <div className="item__container">
                <div className="item__summary">

                    <div className="item__sumary--name">
                        <h1>
                            {
                                name
                            }
                        </h1>
                    </div>

                    <div className="item__summary--price">
                        <span>
                            {
                                this.props.selectedCurrency.symbol
                            } 
                        </span>

                        <span>
                            {
                                price.amount
                            }
                        </span>
                    </div>

                    <div className="item__summary--attributes">
                            {
                                productAttributesList
                            }
                    </div>

                </div>

                <div className="item__item">

                    <div className="item__item--quantity">
                            
                        <button className="item-quantity__increment" onClick={this.handleIncrement}>
                        </button>

                        <div className="item-quantity__quantity">
                            {
                                quantity
                            }
                        </div>

                        <button className="item-quantity__decrement" onClick={this.handleDecrement}>
                        </button>

                    </div>

                    <div className="item__item--image">

                        {/* Image carousel is disabled in cart-overlay aka minicart */}
                        
                        {
                            gallery.length > 1 && !this.props.hideCarousel ?
                                <Carousel gallery={gallery}/>
                            :
                                <img src={gallery[0]} alt="Product" />
                        }
                        
                    </div>

                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    incrementItem: (item) => dispatch(incrementItem(item)),
    decrementItem: (item) => dispatch(decrementItem(item)),
    changeCartItemAttribute: (item) => dispatch(changeCartItemAttribute(item))
})

export default connect(null, mapDispatchToProps)(Item)