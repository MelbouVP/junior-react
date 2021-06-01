import React, { Component } from 'react'

import './product-attribute.styles.scss'

export class ProductAttribute extends Component {

    constructor(props){
        super(props)

        this.state = {

        }
    }

    componentDidMount() {


        const { selectedAttribute, attribute } = this.props

        // console.log(selectedAttribute, "  ",attribute)


        if(selectedAttribute){

            this.setState( () => {
                return {
                        [selectedAttribute.name]:selectedAttribute.value

                }
            })
            
        } else {
            let attributeName = this.sanitizeVariable(attribute.name)

            this.setState( () => {
                return {
                    // selected: {
                        [attributeName]: attribute.items[1].value
                    // }
                }
            })

            this.props.sendChosenAttributes(this.props.attribute.items[1].value, attributeName)
        }
    }

    sanitizeVariable = (variable) => {
        return variable.toLowerCase().replace(/ /g, '-')
    } 

    handleChange = (value, attributeName) => {
        console.log(value, "  ", attributeName)
        this.props.sendChosenAttributes(value, attributeName)
        this.setState( () => {
            
            return {
                    [attributeName]: value
            }
        })

 

    }

    render() {
        let { attribute, productName } = this.props
        // console.log(this.state)

        console.log('product-attribute')
        
        const attributeLabelComponents = [attribute].map( (attribute,index) => {
            
            let attributeName = this.sanitizeVariable(attribute.name)
            let product = this.sanitizeVariable(productName)

            if(attribute.type === 'swatch'){

                return (
                    <div className="options__colors" key={index}>
                        {
                            attribute.items.map( (attributeItem,index) => {
                                return (
                                    <label 
                                        htmlFor={`${product}-${attributeItem.id}`}
                                        className={`color__options--${attributeItem.id.toLowerCase()}`}
                                        key={index}
                                    >
                                        <input 
                                            type="radio" 
                                            name={`${product}-${attribute.name}-${attributeItem.id}`} 
                                            id={`${product}-${attribute.name}-${attributeItem.id}`}
                                            value={attributeItem.id}
                                            checked={this.state[attributeName] === attributeItem.value}
                                            onChange={() => this.handleChange(attributeItem.value, attributeName)}
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
                    <div className={`options__${product}`} key={index}>
                        {
                            attribute.items.map( (attributeItem,index) => {
                                
                                return (
                                    <label 
                                        htmlFor={`${product}-${attribute.name}-${attributeItem.id}`}
                                        key={index}
                                    >
                                        <input 
                                            type="radio" 
                                            name={`${product}-${attribute.name}-${attributeItem.id}`}
                                            id={`${product}-${attribute.name}-${attributeItem.id}`}
                                            value={attributeItem.id}
                                            checked={this.state[attributeName] === attributeItem.value}
                                            onChange={(e) => this.handleChange(attributeItem.value, attributeName)}
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
