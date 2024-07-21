import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import logo1 from '../assets/logo-1.svg';
import logo2 from '../assets/logo-2.svg';
import logo3 from '../assets/logo-3.svg';
import logo4 from '../assets/logo-4.svg';
import logo5 from '../assets/logo-5.svg';

function MyCarousel() {
    return (
        <div className=' '>
            <Carousel
                centerMode={true}
                centerSlidePercentage={20}
                showArrows={true}
                showStatus={false}
                showThumbs={false}
                infiniteLoop={true}
                interval={2000}
                autoPlay={true}
                emulateTouch={true}
                // renderIndicators={false}
            >
                <div className='h-[300px]'>   
                    <img className='object-contain h-full' src={logo1} alt="img" />
                </div>
                <div className='h-[300px]'>
                    <img className='object-contain h-full' src={logo2} alt="img" />
                </div>
                <div className='h-[300px]'>
                    <img className='object-contain h-full' src={logo3} alt="img" />
                </div>
                <div className='h-[300px]'>
                    <img className='object-contain h-full'  src={logo4} alt="img" />
                </div>
                <div className='h-[300px]'>
                    <img className='object-contain h-full' src={logo5} alt="img" />
                </div>
                
            </Carousel>
        </div>
    );
}
export default MyCarousel