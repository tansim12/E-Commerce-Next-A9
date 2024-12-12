import React from "react";
import dynamic from "next/dynamic";
const EmblaCarousel = dynamic(() => import("../Components/ui/Slider/EmblaCarousel"), { ssr: false });
const TopSaleProducts = dynamic(() => import("../Components/ui/HomePage/TopSaleProducts"), { ssr: false });
const FlashSaleProducts = dynamic(() => import("../Components/ui/HomePage/FlashSaleProducts"), { ssr: false });
const ScrollToTopButton = dynamic(() => import("../Components/ui/ScrollTopButton/ScrollToTopButton"), { ssr: false });
const RelevantProducts = dynamic(() => import("../Components/ui/Products/RelevantProducts"), { ssr: false });

// import TopSaleProducts from "../Components/ui/HomePage/TopSaleProducts";
// import FlashSaleProducts from "../Components/ui/HomePage/FlashSaleProducts";
// import ScrollToTopButton from "../Components/ui/ScrollTopButton/ScrollToTopButton";
// import RelevantProducts from "../Components/ui/Products/RelevantProducts";

export interface TSlides {
  img: string;
  text: string;
}
const CHomePage = () => {
  return (
    <div className="relative">
      {/* slider Section  */}
      <div className="mx-2">
        <EmblaCarousel />
      </div>
      {/* top sale  product */}
      <div className="my-10">
        <TopSaleProducts />
      </div>
      {/* flash sale product */}
      <div className="my-10">
        <FlashSaleProducts />
      </div>

      {/* scroll button  */}
      <div className="absolute">
        <ScrollToTopButton />
      </div>

      {/* relevant products  */}
      <div>
        <RelevantProducts />
      </div>
    </div>
  );
};

export default CHomePage;
