import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import history from '../../history'

import { ReactComponent as BrandIcon } from '../../Assets/Brand-icon.svg'
import { ReactComponent as CartIcon } from '../../Assets/Cart-icon.svg'

import CartOverlay from '../Cart-overlay/cart-overlay.component'
import CurrencyOverlay from '../Currency-overlay/currency-overlay.component'

import { selectSelectedCategory } from '../../Redux/shop/shop.selectors'
import { changeSelectedCategory } from '../../Redux/shop/shop.actions'

import { toggleCartOverlay } from '../../Redux/cart/cart.actions';
import { selectCartOverlayHidden, selectCartItemCount } from '../../Redux/cart/cart.selectors'

import { changeSelectedCurrency, toggleCurrencyOverlay } from '../../Redux/currency/currency.actions';

import { 
    selectCurrencyOverlayHidden, 
    selectCurrencies,
    selectSelectedCurrency,
    selectCurrencySymbols
} from '../../Redux/currency/currency.selectors'

import './navbar.styles.scss'

export class Navbar extends Component {

    // This component is responsible for rendering:
    // currency overlay, cart overlay aka minicart and category names

    constructor(props){
        super(props)

        // API doesn't provide list of categories, therefore it's hard-coded
        this.state = {
            categories: ['clothes', 'tech', 'all']
        }
    }


    handleCartOverlay = () => {
        // disable cart overlay on cart page
        if(history.location.pathname === '/cart') return
        
        // currency overlay and cart overlay can't be open at the same time
        // make sure they don't intersect by closing which ever is open
        if(!this.props.currencyOverlayHidden){
            this.props.toggleCurrencyOverlay()
        }
        return this.props.toggleCartOverlay()
    }

    handleCurrencyOverlay = () => {
        if(!this.props.cartOverlayHidden){
            this.props.toggleCartOverlay()
        }
        return this.props.toggleCurrencyOverlay()
    }

    // Changes selected currency in redux state
    handleCurrencyChange = (currency) => {
        this.props.changeSelectedCurrency(currency)
        this.props.toggleCurrencyOverlay()
    }

    // Changes selected category in redux state
    handleCategoryChange = (category) =>{
        this.props.changeSelectedCategory(category)
        // Pushes back to product listing page where results are displayed, if user is on other page
        history.push('/')
    }

    render() {

        // data is received from redux state
        const { 
            currencyOverlayHidden, 
            cartOverlayHidden, 
            selectedCurrency, 
            currencies, 
            currencySymbols ,
            selectedCategory,
            cartItemCount
        } = this.props


        // Creates category links in navbar
        // Highlights link that is currently selected
        const linkComponents = this.state.categories.map( (category, index) => 
            <li key={index}
                className={`navbar__link ${category === selectedCategory ? 'link-active' : ''}`}
                onClick={() => this.handleCategoryChange(category)}
            > 
                {
                    category
                }
            </li>
        )

        
        return (
            <nav className="navigation">
                <div className="navigation__navbar">

                    <div className="navbar__container">

                        {
                            linkComponents
                        }

                    </div>
                    <div className="navbar__container">
                        <div className="navbar__brand-icon">
                            <BrandIcon />
                        </div>
                    </div>
                    <div className="navbar__container">

                        <div 
                            className="navbar__currency-container" 
                            onClick={this.handleCurrencyOverlay}
                        >
                            <div className="currency">
                                {
                                    selectedCurrency.symbol
                                }
                            </div>
                            <div className="chevron-up"></div>
                        </div>
                        <div 
                            className="navbar__cart-icon" 
                            onClick={this.handleCartOverlay}
                        >
                            <CartIcon />

                            {
                                    cartItemCount > 0 ?
                                        <div className="navbar__cart-icon--product-counter">
                                            {
                                                cartItemCount
                                            }
                                        </div>
                                    :
                                        null
                            }


                        </div>

                        {
                            cartOverlayHidden ?
                                null   
                            :
                                <CartOverlay />
                        }

                        {
                            currencyOverlayHidden ?
                                null   
                            :
                                <CurrencyOverlay 
                                    currencies={currencies} 
                                    currencySymbols={currencySymbols} 
                                    handleCurrencyChange={this.handleCurrencyChange}
                                />
                        }

                    </div>

                </div>
            </nav>
        )
    }
}



const mapDispatchToProps = dispatch => ({
    toggleCartOverlay: () => dispatch(toggleCartOverlay()),
    toggleCurrencyOverlay: () => dispatch(toggleCurrencyOverlay()),
    changeSelectedCurrency: (currency) => dispatch(changeSelectedCurrency(currency)),
    changeSelectedCategory: (categoryName) => dispatch(changeSelectedCategory(categoryName))
})

const mapStateToProps = createStructuredSelector({
    cartOverlayHidden: selectCartOverlayHidden,
    currencyOverlayHidden: selectCurrencyOverlayHidden,
    selectedCurrency: selectSelectedCurrency,
    currencies: selectCurrencies,
    currencySymbols: selectCurrencySymbols,
    selectedCategory: selectSelectedCategory,
    cartItemCount: selectCartItemCount
})

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
