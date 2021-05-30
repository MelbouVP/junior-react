import React, { Component } from 'react'

import './product-attribute.styles.scss'

export class ProductAttribute extends Component {
    render() {
        const { attribute } = this.props
        console.log(attribute)

        const attributeLabelComponents = [attribute].map( (attribute) => {
            if(attribute.type === 'swatch'){

                return (
                    <div className="options__colors">
                        {
                            attribute.items.map( (attributeItem,index) => {
                                
                                return (
                                    <label htmlFor={attributeItem.id} className={`color__options--${attributeItem.id.toLowerCase()}`}>
                                        <input 
                                            type="radio" 
                                            name={attribute.name} 
                                            id={attributeItem.id}
                                            value={attributeItem.id}
                                            defaultChecked={index === 0  ? true : false }
                                        />
                                    </label>
                                )
                            })
                        }
                    </div>
                )

            } else {
                return (
                    // provide class name that corresponds to product option name
                    <div className={`options__${attribute.name.toLowerCase().replace(/ /g,'-')}`}>
                        {
                            attribute.items.map( (attributeItem,index) => {
                                return (
                                    <label htmlFor={`${attribute.name}-${attributeItem.id}`}>
                                        <input 
                                            type="radio" 
                                            name={attribute.name} 
                                            id={`${attribute.name}-${attributeItem.id}`}
                                            value={attributeItem.id}
                                            defaultChecked={index === 0  ? true : false }
                                        />
                                        <span>
                                            {
                                                attributeItem.value
                                            }
                                        </span>
                                    </label>
                                )
                            })
                        }
                    </div>
                )
            }
        })

        return (
            <div className="product-attribute">
                <div className="product-attribute__title">
                    <h4>
                        {
                            attribute.name + ':'
                        }
                    </h4>
                </div>

                <div className="product-attribute__options">
                    {
                        attributeLabelComponents
                    }
                </div>
                
            </div>
        )
    }
}

export default ProductAttribute
