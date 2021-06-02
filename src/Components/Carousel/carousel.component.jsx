
import React, { Component } from 'react'

import Slider from "react-slick";

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import './carousel.styles.scss'


export class Carousel extends Component {
    render() {

        const { gallery } = this.props

        const settings = {
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        };

        const images = gallery.length ? 
            gallery.map( (image,index) =>
                <img key={index} src={image} alt="Product"></img>
            )
        :
            null

        return (
            <div className="carousel__product-images">
                <Slider {...settings}>
                    {
                        images
                    }
                </Slider>
            </div>
        )
        
    }
}

export default React.memo(Carousel)
