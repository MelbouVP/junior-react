import React, { Component } from 'react'

import './product-attribute.styles.scss'

export class ProductAttribute extends Component {

    // This component is responsible for rendering individual product attribute
    // and keeping track of attribute choice 
    // change of selected attribute is passed to parent component(Item and Product page)

    constructor(props){
        super(props)

        this.state = {

        }
    }

    componentDidMount() {

        // data is received from parent component
        const { selectedAttribute, attribute } = this.props

        // if product already has attribute selected then assign it
        // if not then choose second value from a list of possible attribute values and assign it
        // product will have an attribute selected when its in cart overlay or cart page
        // product wont have a selected attribute when it is being chosen i.e. product description page
        if(selectedAttribute){

            this.setState( () => ({
                    [selectedAttribute.name]:selectedAttribute.value
                })
            )
            
        } else {
            // remove whitespaces in attribute name
            let attributeName = this.sanitizeVariable(attribute.name)


            this.setState( () => ({
                    [attributeName]: attribute.items[1].value
                })
            )

            // send assigned attribute value to parent state - product description page
            this.props.sendChosenAttributes(this.props.attribute.items[1].value, attributeName)
        }
    }

    sanitizeVariable = (variable) => {
        return variable.toLowerCase().replace(/ /g, '-')
    } 

    handleChange = (value, attributeName) => {

        this.setState( () => ({
                [attributeName]: value
            })
        )

        // send new value to parents - Item or PDP
        this.props.sendChosenAttributes(value, attributeName)
    }

    render() {
        // data is received from parent
        let { attribute } = this.props
        let { productName, labelValue } = this.props.label

        // attribute is an object, [] brackets are used to 
        // turn it into array containing object for easier access of properties and identification purposes
        const attributeLabelComponents = [attribute].map( (attribute,index) => {
            
            let attributeName = this.sanitizeVariable(attribute.name)
            let product = this.sanitizeVariable(productName)

            // 1.Create different visual represantations based on attribute type
            // 2.Each label has combined values in htmlFor, name, id properties to differentiate
            // them between each other if products with similar product attributes are rendered on the
            // same page or the same product is rendered on the same page more than once
            // 3. Label is checked if selected attribute is provided from parent component
            // if not then it is checked based on attribute that was assigned when component mounted
            if(attribute.type === 'swatch'){

                return (
                    <div className="options__colors" key={index}>
                        {
                            attribute.items.map( (attributeItem,index) => {

                                // for colors attributeItem.id is name of the color
                                // attributeItem.value is hex code of color
                                return (
                                    <label 
                                        htmlFor={`${product}-${attribute.name}-${attributeItem.id}-${labelValue}`}
                                        className={`color__options--${attributeItem.id.toLowerCase()}`}
                                        key={index}
                                    >
                                        <input 
                                            type="radio" 
                                            name={`${product}-${attribute.name}-${attributeItem.id}-${labelValue}`} 
                                            id={`${product}-${attribute.name}-${attributeItem.id}-${labelValue}`}
                                            value={attributeItem.id}
                                            checked={this.props.selectedAttribute ? this.props.selectedAttribute.value  === attributeItem.value : this.state[attributeName] === attributeItem.value }
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
                    // provide class name that corresponds to product name
                    <div className={`options__${product}`} key={index}>
                        {
                            attribute.items.map( (attributeItem,index) => {

                                // for attributes that are not color attributes
                                // attributeItem.id and attributeItem.value are the same
                                
                                return (
                                    <label 
                                        htmlFor={`${product}-${attribute.name}-${attributeItem.value}-${labelValue}`}
                                        key={index}
                                    >
                                        <input 
                                            type="radio" 
                                            name={`${product}-${attribute.name}-${attributeItem.value}-${labelValue}`}
                                            id={`${product}-${attribute.name}-${attributeItem.value}-${labelValue}`}
                                            value={attributeItem.value}
                                            checked={this.props.selectedAttribute ? this.props.selectedAttribute.value  === attributeItem.value : this.state[attributeName] === attributeItem.value }
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
