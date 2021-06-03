import React, { Component } from 'react'


import './currency-overlay.styles.scss'

export class CurrencyOverlay extends Component {

    // This component is responsible for rendering available currencies
    // and passing changed currency to parent component Navbar

    handleClick = (currency) => {
        this.props.handleCurrencyChange(currency)
    }

    render() {
        // data is received from Navbar
        const { currencies, currencySymbols } = this.props


        // Compare API currency list with currencies in the app state, find corresponding symbol and name
        // API provides a list of currency names but not symbols,
        // currency names and associated symbols are hard coded in the app state(currencySymbols)
        const currencyList = currencies.map(currencyName => {
            
            let currencyData

            currencySymbols.forEach( currency => {
                if(currency.name === currencyName){
                    currencyData = currency
                }
            })

            return currencyData
        })

        // Create individual currency component
        const currencyListComponents = currencyList.map( (currency, index) =>
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
                        currencyListComponents
                    }
                </div>
            </div>
        )
    }
}

export default React.memo(CurrencyOverlay)
