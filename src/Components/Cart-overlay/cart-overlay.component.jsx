import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import history from '../../history'

import { toggleCartOverlay } from '../../Redux/cart/cart.actions'

import './cart-overlay.styles.scss'

export class CartOverlay extends Component {

    handleRedirect = () => {
        history.push('/cart')
        this.props.toggleCartOverlay()
    }

    render() {
        
        return (
            <div className="cart-overlay">
                <div className="cart-overlay__content">
                    <div className="content__header">
                        <p><span>My bag,</span> bag is empty</p>
                    </div>

                    <div className="content__cart-items">

                    </div>

                    <div className="content__action-buttons" onClick={this.handleRedirect}>

                        <div className="content__action" >
                            <button className="action-button view-bag-button">
                                view bag
                            </button>
                        </div>

                        <div className="content__action" >
                            <button className="action-button checkout-button">
                                checkout
                            </button>
                        </div>


                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    toggleCartOverlay: () => dispatch(toggleCartOverlay())
})

const mapStateToProps = createStructuredSelector({

})

export default connect(mapStateToProps, mapDispatchToProps)(CartOverlay)
