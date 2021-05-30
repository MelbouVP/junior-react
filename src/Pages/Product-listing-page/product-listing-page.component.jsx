import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import Spinner from '../../Components/Spinners/spinner.component'

import { selectSelectedCategory, selectShopHasLoaded } from '../../Redux/shop/shop.selectors'

import './product-listing-page.styles.scss'

export class ProductListingPage extends Component {



    render() {

        const { shopHasLoaded } = this.props
        let { selectedCategory } = this.props

        // capitalize first letter
        selectedCategory = selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)

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
                                <div>Shop data</div>
                            :
                                <Spinner />
                        }
                    </div>
                </div>
            </div>
        )
    }
}

// const mapDispatchToProps = dispatch => ({

// })

const mapStateToProps = createStructuredSelector({
    selectedCategory: selectSelectedCategory,
    shopHasLoaded: selectShopHasLoaded
})

export default connect(mapStateToProps)(ProductListingPage)
