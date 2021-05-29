import React, { Component } from 'react'


import './currency-overlay.styles.scss'

export class CurrencyOverlay extends Component {
    render() {
        return (
            <div className="currency-overlay">
                <div className="currency-overlay__content">
                    <div className="content__header">
                        Currency overlay
                    </div>
                </div>
            </div>
        )
    }
}

export default CurrencyOverlay
