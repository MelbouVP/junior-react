import React, { Component } from 'react'

import { ReactComponent as CartIcon } from '../../Assets/Cart-icon.svg'

import './product-card.styles.scss'

export class ProductCard extends Component {
    render() {
        const { name, inStock, prices, gallery, attributes } = this.props.productData
        const { selectedCurrency, handleRedirect, handleCartItem } = this.props

        const swatchAttribute = attributes.filter(attribute => {
            if(attribute.type === 'swatch'){
                return attribute
            } else {
                return false
            }
        })

        const optionsComponents = swatchAttribute ? 
            swatchAttribute.map( attribute => {
                return attribute.items.map((item,index) => {
                    return (
                        <span 
                            key={index} 
                            className="dot" 
                            style={{backgroundColor: item.value, border: '1px solid grey'}} 
                        ></span>
                    )
                })
            })
        :
            null
        
        const price = prices.find( price => price.currency === selectedCurrency.name )

        return (
            <div className="product-card">
                <div className="product-card__container" onClick={() => handleRedirect(this.props.productData)}>
                    <div className="product-card__image">
                        <img src={gallery[0]} alt="Product" />
                    </div>
                    <div className="product-card__overview">
                        <div className="overview__product-header">
                            <h4 className="overview__product-name">
                                {
                                    name
                                }
                            </h4>

                            <div className="overview__product-options">
                                {
                                    optionsComponents
                                }
                            </div>
                        </div>
                        <div className="overview__product-price">
                            <span>
                                {
                                    selectedCurrency.symbol
                                } 
                            </span>

                            <span>
                                {
                                    price.amount
                                }
                            </span>
                        </div>
                    </div>
                </div>

                {
                    !inStock ?
                        <div className="overlay__out-of-stock">
                            <div>
                                Out of stock
                            </div>
                        </div>
                    :
                        <div 
                            className="product-card__cart-icon" 
                            onClick={() => handleCartItem(this.props.productData)}
                        >
                            <CartIcon />
                        </div>
                }

            </div>
        )
    }
}

export default React.memo(ProductCard)
