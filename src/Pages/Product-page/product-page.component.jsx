import React, { Component } from 'react'
import history from '../../history'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { selectSelectedProduct } from '../../Redux/shop/shop.selectors'

import { selectSelectedCurrency } from '../../Redux/currency/currency.selectors'

import ProductAttribute from '../../Components/Product-attribute/product-attribute.component'

import './product-page.styles.scss'
export class ProductPage extends Component {
    constructor(props){
        super(props)

        this.state = {}
    }

    componentDidMount(){

        if(!this.props.selectedProduct) history.push('/')
    }

    getSelectedAttributes = (value, attributeName) => {
        this.setState( prevState => {
            return {
                ...prevState,
                [attributeName]: value
            }
        })
    }

    handleCartItem = (e) => {
        e.preventDefault()
        
        console.log('added')

    }

    render() {
        const { name, prices, gallery, description, attributes } = this.props.selectedProduct || {}
        console.log(this.state)
        // skip first image since it is main image
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
                    sendSelectedAttributes={this.getSelectedAttributes}
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

                            <form className="product-page__content" onSubmit={this.handleCartItem}>

                                <div className="product-page__header">
                                    <h1>
                                        {
                                            name
                                        }
                                    </h1>
                                </div>

                                <div className="product-page__attributes">
                                    {
                                        attributeList
                                    }
                                </div>

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


const mapStateToProps = createStructuredSelector({
    selectedProduct: selectSelectedProduct,
    selectedCurrency: selectSelectedCurrency
})

export default connect(mapStateToProps)(ProductPage)
