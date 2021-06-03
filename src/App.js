import React, { Component, Suspense, lazy } from 'react'
import { Route, Switch } from "react-router-dom";
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'


import Navbar from './Components/Navbar/navbar.component'
import ProductListingPage from './Pages/Product-listing-page/product-listing-page.component'
import ErrorBoundary from './Components/Error-boundary/error-boundary.component'
import Spinner from './Components/Spinners/spinner.component'


import { selectCurrencyHasLoaded } from './Redux/currency/currency.selectors'
import { fetchCurrenciesStart } from './Redux/currency/currency.actions'
import { fetchProductDataStart } from './Redux/shop/shop.actions'

import './App.css';

// load ProductPage and CartPage only when user proceeds to them
const ProductPage = lazy(() => import('./Pages/Product-description-page/product-page.component'))
const CartPage = lazy(() => import('./Pages/Cart-page/cart-page.component'))

export class App extends Component {

  // fetch currency data
 // and fetch clothes category product data (default category in redux state)
  componentDidMount() {
    this.props.fetchCurrenciesStart()
    this.props.fetchProductDataStart()
  }
  
  render() {

    const { currencyHasLoaded } = this.props 

    return (
          <div className="App">
            <ErrorBoundary>
              <Suspense fallback={<Spinner />}>
              { 
                currencyHasLoaded ? 
                  <>
                    <Navbar />
                    <Switch >
                      <Route exact path='/' component={ProductListingPage} />
                      <Route exact path='/cart' component={CartPage} />
                      <Route exact path='/product/:name' component={ProductPage} />
                    </Switch>
                  </>
                :
                  <Spinner />
              }
              </Suspense>
            </ErrorBoundary>
            </div>
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
