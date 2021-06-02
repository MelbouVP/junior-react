import React, { Component } from 'react'
import { connect } from 'react-redux'
import { incrementItem, decrementItem, changeCartItemAttribute } from '../../Redux/cart/cart.actions'

import ProductAttribute from '../Product-attribute/product-attribute.component'
import Carousel from '../Carousel/carousel.component'

import './item.styles.scss'

export class Item extends Component {
    constructor(props){
        super(props)

        this.state = {
            chosenAttributes: []
        }
    }

    componentDidMount(){
        // this.setState( prevState => ({
        //         ...prevState,
        //         chosenAttributes: this.props.cartItem.selectedAttributes
        //     })
        // )
    }

    changeSelectedAttribute = (productName, attributes) => {

        this.props.changeCartItemAttribute({name: productName, attributes})

    }

    getChosenAttributes = (value, attributeName) => {
        
        let attributeExists = this.props.cartItem.selectedAttributes.find( attribute => attribute.name === attributeName)

        if(attributeExists){
            let updatedAttributes = this.props.cartItem.selectedAttributes
                    .map(attribute => {                    
                        if(attribute.name === attributeName){
                            attribute.value = value
                            return attribute
                        } else {
                            return attribute
                        }
            })

            this.changeSelectedAttribute(this.props.cartItem.name, updatedAttributes)

            return this.setState( prevState => ({
                ...prevState,
                chosenAttributes: updatedAttributes
            }))

        } else {

            let updateAttributes = {
                chosenAttributes: [
                    ...this.props.cartItem.selectedAttributes,
                    {
                        name: attributeName,
                        value
                    }
                ]   
            }

            this.changeSelectedAttribute(this.props.cartItem.name, updateAttributes.chosenAttributes)

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
            attributes.map( (attribute,index) => 
                    <ProductAttribute 
                        key={`${name}+${index}`}
                        attribute={attribute} 
                        sendChosenAttributes={this.getChosenAttributes}
                        productName={name}
                        selectedAttribute={selectedAttributes[index]}
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