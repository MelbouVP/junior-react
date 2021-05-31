import React, { Component } from 'react'

import './product-attribute.styles.scss'

export class ProductAttribute extends Component {

    constructor(props){
        super(props)

        this.state = {}
    }

    componentDidMount() {

        if(this.props.attribute){

            let attributeName = this.sanitizeVariable(this.props.attribute.name)

            this.setState((prevState) => {
                return {
                    ...prevState,
                    [attributeName]: this.props.attribute.items[1].value
                }
                
              }
            )

            this.props.sendSelectedAttributes(this.props.attribute.items[1].value, attributeName)
        }
    }

    sanitizeVariable = (variable) => {
        return variable.toLowerCase().replace(/ /g, '-')
    } 

    handleChange = (value, attributeName) => {
        
        this.setState( prevState => {
            return {
                ...prevState,
                [attributeName]: value
            }
        })

        this.props.sendSelectedAttributes(value, attributeName)

    }

    render() {
        const { attribute } = this.props

        const attributeLabelComponents = [attribute].map( (attribute,index) => {

            let attributeName = this.sanitizeVariable(attribute.name)

            if(attribute.type === 'swatch'){

                return (
                    <div className="options__colors" key={index}>
                        {
                            attribute.items.map( (attributeItem,index) => {
                                
                                return (
                                    <label 
                                        htmlFor={attributeItem.id} 
                                        className={`color__options--${attributeItem.id.toLowerCase()}`}
                                        key={index}
                                    >
                                        <input 
                                            type="radio" 
                                            name={attribute.name} 
                                            id={attributeItem.id}
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
                    <div className={`options__${attributeName}`} key={index}>
                        {
                            attribute.items.map( (attributeItem,index) => {
                                
                                return (
                                    <label 
                                        htmlFor={`${attribute.name}-${attributeItem.id}`}
                                        key={index}
                                    >
                                        <input 
                                            type="radio" 
                                            name={attribute.name} 
                                            id={`${attribute.name}-${attributeItem.id}`}
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

export default React.memo(ProductAttribute)
