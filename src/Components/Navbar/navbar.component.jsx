import React, { Component } from 'react'

import { ReactComponent as BrandIcon } from '../../Assets/Brand-icon.svg'
import { ReactComponent as CartIcon } from '../../Assets/Cart-icon.svg'

import './navbar.styles.scss'

export class Navbar extends Component {

    

    render() {
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

                        <div className="navbar__currency-container">
                            <div className="currency">
                                $
                            </div>
                            <div className="chevron-up"></div>
                        </div>
                        <div className="navbar__cart-icon">
                            <CartIcon />
                            <div className="navbar__cart-icon--product-counter">
                                <p>2</p>
                            </div>
                        </div>

                    </div>

                </div>
            </nav>
        )
    }
}

export default Navbar
