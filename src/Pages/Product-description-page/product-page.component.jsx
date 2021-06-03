import React, { Component } from 'react'
import history from '../../history'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import ProductAttribute from '../../Components/Product-attribute/product-attribute.component'
import PageOverlay from '../../Components/Page-overlay/page-overlay.component'

import { selectSelectedProduct } from '../../Redux/shop/shop.selectors'
import { selectSelectedCurrency } from '../../Redux/currency/currency.selectors'
import { addItem } from '../../Redux/cart/cart.actions'


import './product-page.styles.scss'
export class ProductPage extends Component {

    // This component is responsible for rendering individual product
    // and track attributes that were selected for this product

    // 1.There is some code duplication when comparing to Item component
    // because they serve similar functionality - changing selected attributes of product
    // and sending the product with selected attributes to the redux state
    // 2.But Item component can't be re-used on PDP because PDP functionality requires that
    // the action of adding item with selected attributes to the cart must happen when user clicks 'ADD TO CART' button,
    // unlike Item component which serves the purpose of altering already existing cart item attributes,
    // where action of adding/altering cart item can be done when user changes any of the existing product attributes

    constructor(props){
        super(props)

        this.state = {
            chosenAttributes: []
        }
    }

    // if selected product doesn't exist push to PLP
    componentDidMount(){
        if(!this.props.selectedProduct) history.push('/')
    }


    // Get selected attribute from Product Attribute component
    getChosenAttributes = (value, attributeName) => {

        // Compare selected attribute to already existing selected attributes
        // if attribute attribute exists, then update the existing selected attributes with newly selected attribute
        // if attribute doesn't exists, assign it to state
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

    // Send product with selected attributes to redux state
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

        // data is received from redux state
        const { name, prices, gallery, description, attributes } = this.props.selectedProduct || {}

        // First image is used as main image, other images are used as accessories
        const imageComponents = gallery ? 
            gallery.slice(1).map(
                (image,index) =>
                    <div className="accessory-image" key={index}>
                        <img src={image} alt="Product" />
                    </div> 
            )
        :
            null

        // find product price corresponding to selected currency
        const price = this.props.selectedCurrency && prices ? 
            prices.find( price => price.currency === this.props.selectedCurrency.name )
        :   
            null

        // See Item component for detailed explanation
        const attributeList = attributes ? 
            attributes.map( (attribute,index) => 
                <ProductAttribute 
                    key={index}
                    attribute={attribute} 
                    sendChosenAttributes={this.getChosenAttributes}
                    label={{ productName: name,  labelValue: (Math.ceil(Math.random()*100))}}
                />
            )
        : 
            null
        
            
        return (
            <div className="product-page" >
                {
                    this.props.selectedProduct ?
                    <div className="product-page__container">

                        <PageOverlay />

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


                                {/* Parse provided product description (with HTML tags) as HTML as it was indicated in test details */}
                                <div 
                                    className="product-page__description" 
                                    dangerouslySetInnerHTML={{__html: description}}
                                ></div>

                                {/* Or alternatively and much safer, remove tags from description and parse variable content */}
                                {/* <div className="product-page__description">
                                    {
                                        description.replace(/<\/?[^>]+(>|$)/g, '')
                                    }
                                </div> */}

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
