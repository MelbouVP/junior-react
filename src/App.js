import React, { Component } from 'react'
import './App.css';


import Navbar from './Components/Navbar/navbar.component'
import ProductListingPage from './Pages/Product-listing-page/product-listing-page.component'

export class App extends Component {

  
  render() {


    return (
      <div className="App">
          <Navbar />
          <ProductListingPage />
      </div>
    )
  }
}

export default App
