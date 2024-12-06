import React from "react";
import EmblaCarousel from "../Components/ui/Slider/EmblaCarousel";

export interface TSlides {
  img: string;
  text: string;
}
const CHomePage =({ searchParams }: { searchParams?: any }) => {
 
  return (
    <div className="">
      {/* slicer Section  */}
      {/* <CarouselSlider /> */}
    <EmblaCarousel   searchParams={searchParams} />
    </div>
  );
};

export default CHomePage;
