import React, { Component } from 'react'


import './currency-overlay.styles.scss'

export class CurrencyOverlay extends Component {


    handleClick = (currency) => {
        this.props.handleCurrencyChange(currency)
    }

    render() {
        console.log('currency-overlay rendered')
        const { currencies, currencySymbols } = this.props

        const currencyList = currencies.map(currencyName => {
            
            let currencyData

            currencySymbols.forEach( currency => {
                if(currency.name === currencyName){
                    currencyData = currency
                }
            })

            return currencyData
        })

        const currencyListComponent = currencyList.map( (currency, index) =>
                <div key={index} className="currency" onClick={() => this.handleClick(currency)}>
                    <div className="currency__symbol">
                        { currency.symbol}
                    </div>
                    <div className="currency__name">
                        { currency.name}
                    </div>
                </div>
            )

        return (
            <div className="currency-overlay">
                <div className="currency-overlay__content">
                    {
                        currencyListComponent
                    }
                </div>
            </div>
        )
    }
}

export default React.memo(CurrencyOverlay)
