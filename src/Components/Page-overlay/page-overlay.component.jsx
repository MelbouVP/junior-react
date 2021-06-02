import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'


import { selectCartOverlayHidden } from '../../Redux/cart/cart.selectors'


import './page-overlay.styles.scss'

export class PageOverlay extends Component {

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
