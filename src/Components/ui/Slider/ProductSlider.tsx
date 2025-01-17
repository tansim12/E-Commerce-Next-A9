"use client";
// CarouselWithThumbnails.tsx
import { useState } from "react";
import {
  CarouselProvider,
  Slider,
  Slide,
  ImageWithZoom,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";

const ProductSlider = ({ slides }: { slides: string[] }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <div>
      <div className="">
        <CarouselProvider
          naturalSlideWidth={85}
          naturalSlideHeight={75}
          totalSlides={slides?.length}
          currentSlide={currentSlide}
          isPlaying={true}
          
        >
          <Slider>
            {slides?.map((slide, index) => (
              <Slide index={index} key={index}>
                <ImageWithZoom src={slide} />
              </Slide>
            ))}
          </Slider>
        </CarouselProvider>
      </div>

      <div className=" flex my-5 ">
        {slides?.map((slide, index) => (
          <button
            key={index}
            className={`p-1 ${currentSlide === index ? "border-2 border-blue-500" : ""}`}
            onClick={() => setCurrentSlide(index)}
          >
            <img
              src={slide}
              alt={`Thumbnail ${index + 1}`}
              className=" h-20 w-28 object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductSlider;
