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
import { selectCartOverlayHidden } from '../../Redux/cart/cart.selectors'

import { changeSelectedCurrency, toggleCurrencyOverlay } from '../../Redux/currency/currency.actions';

import { 
    selectCurrencyOverlayHidden, 
    selectCurrencies,
    selectSelectedCurrency,
    selectCurrencySymbols
} from '../../Redux/currency/currency.selectors'

import './navbar.styles.scss'

export class Navbar extends Component {
    constructor(props){
        super(props)
        this.state = {
            categories: ['clothes', 'tech', 'all']
        }
    }

    handleCartOverlay = () => {
        
        if(!this.props.currencyOverlayHidden){
            this.props.toggleCurrencyOverlay()
        }
        return this.props.toggleCartOverlay()
    }

    handleCurrencyOverlay = () =>{
        if(!this.props.cartOverlayHidden){
            this.props.toggleCartOverlay()
        }
        return this.props.toggleCurrencyOverlay()
    }

    handleCurrencyChange = (currency) => {
        this.props.changeSelectedCurrency(currency)
        this.props.toggleCurrencyOverlay()
    }

    handleCategoryChange = (category) =>{
        this.props.changeSelectedCategory(category)
        history.push('/')
    }

    render() {

        const { 
            currencyOverlayHidden, 
            cartOverlayHidden, 
            selectedCurrency, 
            currencies, 
            currencySymbols ,
            selectedCategory
        } = this.props


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
                            <div className="navbar__cart-icon--product-counter">
                                <p>2</p>
                            </div>

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
    selectedCategory: selectSelectedCategory
})

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
