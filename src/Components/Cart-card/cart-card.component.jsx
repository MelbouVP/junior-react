import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'


import ProductAttribute from '../Product-attribute/product-attribute.component'

import './cart-card.component.scss'
import { incrementItem, decrementItem } from '../../Redux/cart/cart.actions'

export class CartCard extends Component {
    constructor(props){
        super(props)

        this.state = {
            chosenAttributes: []
        }
    }

    componentDidMount(){
        this.setState( prevState => ({
                ...prevState,
                chosenAttributes: this.props.cartItem.selectedAttributes
            })
        )
    }

    getChosenAttributes = (value, attributeName) => {
        
        this.setState( prevState => {

            let attributeExists = prevState.chosenAttributes.find( attribute => attribute.name === attributeName)

            if(attributeExists) {
                let updatedAttributes = prevState.chosenAttributes
                    .map(attribute => {                    
                        if(attribute.name === attributeName){
                            attribute.value = value
                            return attribute
                        } else {
                            return attribute
                        }
                })

                this.props.handleChangedAttribute(this.props.cartItem.name, updatedAttributes)

                return {
                    chosenAttributes: updatedAttributes
                }

            } else {

                this.props.handleChangedAttribute(this.props.cartItem.name, {
                    chosenAttributes: [
                        ...prevState.chosenAttributes,
                        {
                            name: attributeName,
                            value
                        }
                ]})

                return {
                    chosenAttributes: [
                        ...prevState.chosenAttributes,
                        {
                            name: attributeName,
                            value
                        }
                ]}
            }

        })
    }

    handleIncrement = () => {
        this.props.incrementItem(this.props.cartItem)
    }

    handleDecrement = () => {
        this.props.decrementItem(this.props.cartItem)
    }


    render() {

        const { name, prices, gallery, selectedAttributes, attributes, quantity } = this.props.cartItem || {}
        
        const price = this.props.selectedCurrency && prices ? 
            prices.find( price => price.currency === this.props.selectedCurrency.name )
        :   
            null

        const productAttributesList = attributes ? 
            attributes.map( (attribute,index) => 
                <ProductAttribute 
                    key={index}
                    attribute={attribute} 
                    sendChosenAttributes={this.getChosenAttributes}
                    productName={name}
                    selectedAttribute={selectedAttributes[index]}
                />
            )
        : 
            null
        
        return (
            <div className="cart-card__cotnainer">
                <div className="cart-card__summary">

                    <div className="cart-card__sumary--name">
                        <h1>
                            {
                                name
                            }
                        </h1>
                    </div>

                    <div className="cart-card__summary--price">
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

                    <div className="cart-card__summary--attributes">
                            {
                                productAttributesList
                            }
                    </div>

                </div>

                <div className="cart-card__item">

                    <div className="cart-card__item--quantity">
                            
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

                    <div className="cart-card__item--image">
                        
                        <img src={gallery[0]} alt="Product" />
                    </div>

                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    incrementItem: (item) => dispatch(incrementItem(item)),
    decrementItem: (item) => dispatch(decrementItem(item))
})


const mapStateToProps = createStructuredSelector({
    
})

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(CartCard))
