import React, { Component } from 'react'


import './cart-overlay.styles.scss'

export class CartOverlay extends Component {
    render() {
        return (
            <div className="cart-overlay">
                <div className="cart-overlay__content">
                    <div className="content__header">
                        <p><span>My bag,</span> bag is empty</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default CartOverlay
