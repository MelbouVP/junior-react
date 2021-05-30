import React, { Component } from 'react'
import history from '../../history'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import ProductCard from '../../Components/Product-card/product-card.component'
import Spinner from '../../Components/Spinners/spinner.component'

import { changeSelectedProduct } from '../../Redux/shop/shop.actions'

import { selectSelectedCurrency } from '../../Redux/currency/currency.selectors'

import { 
    selectSelectedCategory, 
    selectShopHasLoaded, 
    selectShopCategoryProducts 
} from '../../Redux/shop/shop.selectors'

import './product-listing-page.styles.scss'

export class ProductListingPage extends Component {

    handleRedirect = (product) => {

        this.props.changeSelectedProduct(product)
        history.push(`/product/${product.name}`)
    }

    handleCartItem = () => {
        console.log('added to cart')
    }

    render() {

        const { shopHasLoaded, categoryProducts, selectedCurrency } = this.props
        let { selectedCategory } = this.props

        // capitalize first letter
        selectedCategory = selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)

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
    changeSelectedProduct: (product) => dispatch(changeSelectedProduct(product))
})

const mapStateToProps = createStructuredSelector({
    selectedCategory: selectSelectedCategory,
    shopHasLoaded: selectShopHasLoaded,
    categoryProducts: selectShopCategoryProducts,
    selectedCurrency: selectSelectedCurrency
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductListingPage)
