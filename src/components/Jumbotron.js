import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

function Jumbotron() {
    return (
        <div>
            <div className='carousel-content'>
                <h1 class="fw-bold secondary-color">
                    Book unique and <br />luxurious places with us.
                </h1>
                <h2>
                    The #1 platform to find drippin' houses
                </h2>
            </div>
            <Carousel
                showThumbs={false}
                autoPlay
                intervals={5000}
                transitionTime={800}
                showArrows={true}
                swipeable={true}
                emulateTouch={true}
                
            >

                <div>
                    <img src="/img/house1.jpg" />

                </div>
                <div>
                    <img src="../img/house2.jpg" />

                </div>
                <div>
                    <img src="/img/house3.jpg" />

                </div>
            </Carousel>
            
        </div>
      
        

    );

}

export default Jumbotron;