import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { ReactComponent as BrandIcon } from '../../Assets/Brand-icon.svg'
import { ReactComponent as CartIcon } from '../../Assets/Cart-icon.svg'

import CartOverlay from '../Cart-overlay/cart-overlay.component'
import CurrencyOverlay from '../Currency-overlay/currency-overlay.component'


import { toggleCartOverlay } from '../../Redux/cart/cart.actions';
import { selectCartOverlayHidden } from '../../Redux/cart/cart.selectors'

import { toggleCurrencyOverlay } from '../../Redux/currency/currency.actions';
import { 
    selectCurrencyOverlayHidden, 
    selectCurrencies,
    selectSelectedCurrency
} from '../../Redux/currency/currency.selectors'

import './navbar.styles.scss'

export class Navbar extends Component {

    constructor(props){
        super(props)
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



    render() {

        const { currencyOverlayHidden, cartOverlayHidden, selectedCurrency } = this.props

        
        return (
            <nav className="navigation">
                <div className="navigation__navbar">

                    <div className="navbar__container">

                        <li className="navbar__link link-active">Clothes</li>
                        <li className="navbar__link">Tech</li>
                        <li className="navbar__link">All</li>

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
                                <CurrencyOverlay />
                        }

                    </div>

                </div>
            </nav>
        )
    }
}



const mapDispatchToProps = dispatch => ({
    toggleCartOverlay: () => dispatch(toggleCartOverlay()),
    toggleCurrencyOverlay: () => dispatch(toggleCurrencyOverlay())
})

const mapStateToProps = createStructuredSelector({
    cartOverlayHidden: selectCartOverlayHidden,
    currencyOverlayHidden: selectCurrencyOverlayHidden,
    selectedCurrency: selectSelectedCurrency
})

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
