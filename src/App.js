import React, { Component } from 'react'

import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'


import Navbar from './Components/Navbar/navbar.component'
import ProductListingPage from './Pages/Product-listing-page/product-listing-page.component'

import Spinner from './Components/Spinners/spinner.component'

import { selectCurrencyHasLoaded } from './Redux/currency/currency.selectors'
import { fetchCurrenciesStart } from './Redux/currency/currency.actions'

import { fetchProductDataStart } from './Redux/shop/shop.actions'

import './App.css';
export class App extends Component {


  componentDidMount() {
    this.props.fetchCurrenciesStart()
    this.props.fetchProductDataStart()
  }
  
  render() {

    const { currencyHasLoaded } = this.props 

    return (
      <>
        {
          currencyHasLoaded ?
            <div className="App">
              <Navbar />
              <ProductListingPage />
            </div>
          :
            <Spinner />
        }
      </>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  fetchCurrenciesStart: () => dispatch(fetchCurrenciesStart()),
  fetchProductDataStart: () => dispatch(fetchProductDataStart())
})

const mapStateToProps = createStructuredSelector({
  currencyHasLoaded: selectCurrencyHasLoaded
})

export default connect(mapStateToProps,mapDispatchToProps)(App)
