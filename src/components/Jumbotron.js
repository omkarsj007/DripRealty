import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

function Jumbotron() {
  return (
    <div>
      <div className="carousel-content">
        <h1 className="fw-bold secondary-color">
          Book unique and <br />
          luxurious places with us.
        </h1>
        <h2>The #1 platform to find drippin' houses</h2>
      </div>

      <Carousel
        showThumbs={false}
        autoPlay
        intervals={5000}
        transitionTime={800}
        showArrows={true}
        swipeable={true}
        emulateTouch={true}
        showStatus={false}
        infiniteLoop={true}
      >
        <div>
          <img loading="lazy" src="/img/house1.jpg" className="darken" />
        </div>
        <div>
          <img loading="lazy" src="../img/house2.jpg" className="darken" />
        </div>
        <div>
          <img loading="lazy" src="/img/house3.jpg" className="darken" />
        </div>
      </Carousel>
    </div>
  );
}

export default Jumbotron;
