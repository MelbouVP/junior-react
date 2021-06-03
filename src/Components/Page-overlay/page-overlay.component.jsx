import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'


import { selectCartOverlayHidden } from '../../Redux/cart/cart.selectors'


import './page-overlay.styles.scss'

export class PageOverlay extends Component {

    // This component is responsible for displaying an overlay over current page
    // if cart overlay aka minicart is open

    render() {
        return (
            <>
                {
                    this.props.cartOverlayHidden ?
                        null
                    :
                        <div className="page-overlay"></div>
                }
            </>
        )
    }
}

const mapStateToProps = createStructuredSelector({
    cartOverlayHidden: selectCartOverlayHidden
})

export default connect(mapStateToProps)(PageOverlay)
