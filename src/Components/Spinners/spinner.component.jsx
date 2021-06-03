import React, { Component } from 'react'


import './spinner.styles.scss'

export class Spinner extends Component {

    // This component is responsible for rendering a spinner while data is being fetched

    render() {
        return (
            <div className="spinner__container">
                <div className="spinner">
                    <span className="spinner-inner-1"></span>
                    <span className="spinner-inner-2"></span>
                    <span className="spinner-inner-3"></span>
                </div>
            </div>
        )
    }
}

export default Spinner
