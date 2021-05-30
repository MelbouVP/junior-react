import React, { Component } from 'react'

import './product-card.styles.scss'

export class ProductCard extends Component {
    render() {
        const { name, InStock, prices, gallery, description, category, attributes } = this.props.productData
        const { selectedCurrency } = this.props

        console.log(this.props)

        if(!InStock) console.log('Out of stock:', name)

        attributes.forEach(attribute => {
            if(attribute.type === 'swatch'){
                console.log('Swatch attribute:', name)
            }
        })
        
        const price = prices.find( price => price.currency === selectedCurrency.name )

        return (
            <div className="product-card">
                <div className="product-card__container">
                    <div className="product-card__image">
                        <img src={gallery[0]} alt="Product" />
                    </div>
                    <div className="product-card__overview">
                        <h4 className="overview__product-name">
                            {
                                name
                            }
                        </h4>
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
            </div>
        )
    }
}

export default React.memo(ProductCard)
