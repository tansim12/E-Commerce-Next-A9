import React from "react";
import CarouselSlider from "../Components/ui/HomePage/CarouselSlider";
import EmblaCarousel from "../Components/ui/Slider/EmblaCarousel";

export interface TSlides {
  img: string;
  text: string;
}
const CHomePage = () => {
  const OPTIONS = { loop: true };
  const SLIDES: TSlides[] = [
    { img: "https://i.ibb.co/SnjRV9n/1.webp", text: "sjfgdjkgkdfjg" },
    { img: "https://i.ibb.co/qWJSppK/2.webp", text: "sjfgdjkgkdfjg" },
    { img: "https://i.ibb.co/vc7mQ8s/3.jpg", text: "sjfgdjkgkdfjg" },
    { img: "https://i.ibb.co/7KrYLQJ/3.webp", text: "sjfgdjkgkdfjg" },
    { img: "https://i.ibb.co/mG2tw39/4.webp", text: "sjfgdjkgkdfjg" },
  ];
  return (
    <div className="">
      {/* slicer Section  */}
      {/* <CarouselSlider /> */}
    <EmblaCarousel options={OPTIONS} slides={SLIDES}  />
    </div>
  );
};

export default CHomePage;
