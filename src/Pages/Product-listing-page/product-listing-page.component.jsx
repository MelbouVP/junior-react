import React, { Component } from 'react'
import history from '../../history'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import ProductCard from '../../Components/Product-card/product-card.component'
import Spinner from '../../Components/Spinners/spinner.component'
import PageOverlay from '../../Components/Page-overlay/page-overlay.component'

import { addItem } from '../../Redux/cart/cart.actions'

import { changeSelectedProduct } from '../../Redux/shop/shop.actions'

import { selectSelectedCurrency } from '../../Redux/currency/currency.selectors'

import { 
    selectSelectedCategory, 
    selectShopHasLoaded, 
    selectShopCategoryProducts 
} from '../../Redux/shop/shop.selectors'

import './product-listing-page.styles.scss'

export class ProductListingPage extends Component {

    // This component is responsible for listing product cards
    // in their respective product category and adding selected product to the cart

    // Redirects to product description page
    handleRedirect = (product) => {

        // change selected product in redux state
        this.props.changeSelectedProduct(product)
        history.push(`/product/${product.name}`)
    }

    // Adds product to cart
    handleCartItem = (product) => {
        
        // provide default attributes to selected product
        let defaultAttributes = product.attributes.map(attribute => ({
                
                name: (attribute.name).toLowerCase().replace(/ /g, '-'), // keeps atribute name clean
                value: attribute.items[1].value
        }))

        // update product info with selected attributes and add it to cart
        product = {...product, selectedAttributes: defaultAttributes}

        this.props.addItem(product)
    }

    render() {

        // data is received from redux state
        const { shopHasLoaded, categoryProducts, selectedCurrency } = this.props
        let { selectedCategory } = this.props


        // capitalize first letter of category name
        selectedCategory = selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)

        // create product cards
        const productCardComponents = categoryProducts ? 
            categoryProducts.map( (data,index) => 
                <ProductCard 
                    key={index} 
                    productData={data} 
                    selectedCurrency={selectedCurrency} 
                    handleRedirect={this.handleRedirect}
                    handleCartItem={this.handleCartItem}
                />)
        : 
            null


        return (
            <div className="listing-page">
                <div className="listing-page__container">

                    <PageOverlay />

                    <div className="listing-page__header">
                        <h1 className="header__title">
                            {
                                selectedCategory
                            }
                        </h1>
                    </div>
                    <div className="listing-page__content">
                        {
                            shopHasLoaded ?

                                productCardComponents
                                
                            :
                                <Spinner />
                        }
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    changeSelectedProduct: (product) => dispatch(changeSelectedProduct(product)),
    addItem: (product) => dispatch(addItem(product))
})

const mapStateToProps = createStructuredSelector({
    selectedCategory: selectSelectedCategory,
    shopHasLoaded: selectShopHasLoaded,
    categoryProducts: selectShopCategoryProducts,
    selectedCurrency: selectSelectedCurrency
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductListingPage)
