"use client";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";

const CarouselWithAds = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="flex">
      {/* Carousel Section */}
      <div className="w-2/3">
        <Slider {...settings}>
          <div className="h-72 bg-red-500 flex items-center justify-center">
            <h2 className="text-white text-2xl">Slide 1</h2>
          </div>
          <div className="h-72 bg-blue-500 flex items-center justify-center">
            <h2 className="text-white text-2xl">Slide 2</h2>
          </div>
          <div className="h-72 bg-green-500 flex items-center justify-center">
            <h2 className="text-white text-2xl">Slide 3</h2>
          </div>
        </Slider>
      </div>

      {/* Advertisement Section */}
      <div className="w-1/3 bg-gray-100 p-4">
        <div className="mb-4">
          <h3 className="text-lg font-bold">Download the App</h3>
          <p className="text-sm text-gray-600">Free Delivery & Exclusive Offers</p>
          <button className="mt-2 px-4 py-2 bg-orange-500 text-white rounded">Download Now</button>
        </div>

        <div className="mb-4">
          <img
            src="https://via.placeholder.com/150"
            alt="Ad 1"
            className="w-full rounded"
          />
        </div>

        <div>
          <img
            src="https://via.placeholder.com/150"
            alt="Ad 2"
            className="w-full rounded"
          />
        </div>
      </div>
    </div>
  );
};

export default CarouselWithAds;
