import React from "react";
import EmblaCarousel from "../Components/ui/Slider/EmblaCarousel";
import TopSaleProducts from "../Components/ui/HomePage/TopSaleProducts";
import CategoryAndSubCategory from "../Components/ui/HomePage/CategoryAndSubCategory";
import FlashSaleProducts from "../Components/ui/HomePage/FlashSaleProducts";

export interface TSlides {
  img: string;
  text: string;
}
const CHomePage = () => {
  return (
    <div className="">
      <div className="mb-10 pt-4  w-full">
        <CategoryAndSubCategory />
      </div>
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
    </div>
  );
};

export default CHomePage;
