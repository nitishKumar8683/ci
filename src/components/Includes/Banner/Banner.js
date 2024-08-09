import React from 'react';
import { Box } from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Banner = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        autoplay: true,       
        autoplaySpeed: 3000, 
    };

    return (
        <Box className="relative w-full h-80 md:h-96 overflow-hidden">
            <Slider {...settings}>
                <div style={{ width: '100%', height: '100%' }}>
                    <img
                        src="/shutterstock_288363524.jpg"
                        alt="Picture of the Bus"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                </div>
                <div style={{ width: '100%', height: '100%' }}>
                    <img
                        src="/shutterstock_2407889395.jpg"
                        alt="Picture of the Bus"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                </div>
                <div style={{ width: '100%', height: '100%' }}>
                    <img
                        src="/shutterstock_2468817721.jpg"
                        alt="Picture of the Bus"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                </div>
            </Slider>
        </Box>
    );
}

export default Banner;
