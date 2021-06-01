import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { incrementItem, decrementItem } from '../../Redux/cart/cart.actions'

import ProductAttribute from '../Product-attribute/product-attribute.component'

import './cart-item.styles.scss'

export class CartItem extends Component {
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

            this.props.handleChangedAttribute(this.props.cartItem.name, updateAttributes)

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

        console.log(this.state)

        const { name, prices, gallery, selectedAttributes, attributes, quantity } = this.props.cartItem || {}
        
        const price = this.props.selectedCurrency && prices ? 
            prices.find( price => price.currency === this.props.selectedCurrency.name )
        :   
            null

        const productAttributesList = attributes ? 
            attributes.map( (attribute,index) => {


                // let chosenAttributeIndex = selectedAttributes.findIndex(obj => obj.name === attribute.name)

                
                return (
                    <ProductAttribute 
                        key={name+index}
                        attribute={attribute} 
                        sendChosenAttributes={this.getChosenAttributes}
                        productName={name}
                        selectedAttribute={selectedAttributes[index]}
                    />
                )
            })
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

export default connect(mapStateToProps, mapDispatchToProps)(CartItem)
