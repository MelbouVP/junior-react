import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { incrementItem, decrementItem } from '../../Redux/cart/cart.actions'

import ProductAttribute from '../Product-attribute/product-attribute.component'

import './cart-overlay-card.styles.scss'

export class CartOverlayCard extends Component {
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
        
        let attributeExists = this.state.chosenAttributes.find( attribute => attribute.name === attributeName)

        if(attributeExists){
            let updatedAttributes = this.state.chosenAttributes
                    .map(attribute => {                    
                        if(attribute.name === attributeName){
                            attribute.value = value
                            return attribute
                        } else {
                            return attribute
                        }
            })

            this.props.handleChangedAttribute(this.props.cartItem.name, updatedAttributes)

            return this.setState( prevState => ({
                ...prevState,
                chosenAttributes: updatedAttributes
            }))

        } else {

            let updateAttributes = {
                chosenAttributes: [
                    ...this.state.chosenAttributes,
                    {
                        name: attributeName,
                        value
                    }
                ]   
            }

            this.props.handleChangedAttribute(this.props.cartItem.name, updateAttributes.chosenAttributes)

            return this.setState( prevState => ({
                chosenAttributes: [
                    ...prevState.chosenAttributes,
                    {
                        name: attributeName,
                        value
                    }
            ]}))

        }
    }

    handleIncrement = () => {
        this.props.incrementItem(this.props.cartItem)
    }

    handleDecrement = () => {
        this.props.decrementItem(this.props.cartItem)
    }

    render() {
        console.log('cart-overlay-card rerendered')

        const { name, prices, gallery, attributes, quantity } = this.props.cartItem || {}


        // console.log(this.state)
        
        const price = this.props.selectedCurrency && prices ? 
            prices.find( price => price.currency === this.props.selectedCurrency.name )
        :   
            null

        const productAttributesList = this.props.cartItem.attributes ? 
            attributes.map( (attribute,index) => 
                <ProductAttribute 
                    key={`${name}+${index}`}
                    attribute={attribute} 
                    sendChosenAttributes={this.getChosenAttributes}
                    productName={name}
                    selectedAttribute={this.props.cartItem.selectedAttributes[index]}
                />
            )
        : 
            null
        
        return (
            <div className="cart-overlay-card__container">
                <div className="cart-overlay-card__summary">

                    <div className="cart-overlay-card__sumary--name">
                        <h1>
                            {
                                name
                            }
                        </h1>
                    </div>

                    <div className="cart-overlay-card__summary--price">
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

                    <div className="cart-overlay-card__summary--attributes">
                            {
                                productAttributesList
                            }
                    </div>

                </div>

                <div className="cart-overlay-card__item">

                    <div className="cart-overlay-card__item--quantity">
                            
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

                    <div className="cart-overlay-card__item--image">
                        
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

export default connect(mapStateToProps, mapDispatchToProps)(CartOverlayCard)
