import React, { Component } from 'react'

export class ProductPage extends Component {

    constructor(props){
        super(props)

        this.state = {}
    }


    componentDidMount(){
        
    }

    render() {
        // const { name, inStock, prices, gallery, description, category, attributes } = this.props.productData

        console.log(this.props.match.params)
        return (
            <div>
                
            </div>
        )
    }
}

export default ProductPage
