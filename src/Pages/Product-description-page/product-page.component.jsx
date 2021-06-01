import React, { Component } from 'react'
import history from '../../history'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import ProductAttribute from '../../Components/Product-attribute/product-attribute.component'


import { selectSelectedProduct } from '../../Redux/shop/shop.selectors'
import { selectSelectedCurrency } from '../../Redux/currency/currency.selectors'
import { addItem } from '../../Redux/cart/cart.actions'


import './product-page.styles.scss'
export class ProductPage extends Component {
    constructor(props){
        super(props)

        this.state = {
            chosenAttributes: []
        }
    }

    componentDidMount(){
        if(!this.props.selectedProduct) history.push('/')
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

                return {
                    chosenAttributes: updatedAttributes
                }

            } else {

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

    handleCartItem = (e,name, prices, gallery, attributes) => {
        e.preventDefault()
        const { chosenAttributes } = this.state

        let product = {
            name,
            prices,
            gallery,
            attributes,
            selectedAttributes: chosenAttributes
        }
    
        this.props.addItem(product)
    }

    render() {
        const { name, prices, gallery, description, attributes } = this.props.selectedProduct || {}

        const imageComponents = gallery ? 
            gallery.slice(1).map(
                (image,index) =>
                    <div className="accessory-image" key={index}>
                        <img src={image} alt="Product" />
                    </div> 
            )
        :
            null

        
        const price = this.props.selectedCurrency && prices ? 
            prices.find( price => price.currency === this.props.selectedCurrency.name )
        :   
            null

        const attributeList = attributes ? 
            attributes.map( (attribute,index) => 
                <ProductAttribute 
                    key={index}
                    attribute={attribute} 
                    productName={name}
                    sendChosenAttributes={this.getChosenAttributes}
                />
            )
        : 
            null
        
            
        return (
            <div className="product-page" >
                {
                    this.props.selectedProduct ?
                        <div className="product-page__container">

                            <div className="product-page__images">

                                <div className="images__main-image">
                                    <img src={gallery[0]} alt="Product" />
                                </div>
                                
                                <div className="images__accessory-images">
                                    {
                                        imageComponents
                                    }
                                </div>
                            </div>

                            <form 
                                className="product-page__content" 
                                onSubmit={(e) => this.handleCartItem(e,name, prices, gallery, attributes)}
                            >

                                <div className="product-page__header">
                                    <h1>
                                        {
                                            name
                                        }
                                    </h1>
                                </div>

                                {
                                    attributeList.length ? 
                                        <div className="product-page__attributes">
                                            {
                                                attributeList
                                            }
                                        </div>
                                    :
                                        null
                                }

                                <div className="product-page__price">
                                    <h4>price:</h4>
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

                                <div className="product-page__cart" >
                                    <button type='submit' className="cart__button">
                                       add to cart
                                    </button>
                                </div>

                                <div className="product-page__description">
                                    {
                                        description.replace(/<\/?[^>]+(>|$)/g, '')
                                    }
                                </div>

                            </form>

                        </div>
                    :
                        null
                }
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    addItem: (product) => dispatch(addItem(product))
})


const mapStateToProps = createStructuredSelector({
    selectedProduct: selectSelectedProduct,
    selectedCurrency: selectSelectedCurrency
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage)
