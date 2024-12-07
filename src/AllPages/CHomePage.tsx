import React from "react";
import EmblaCarousel from "../Components/ui/Slider/EmblaCarousel";
import TopSaleProducts from "../Components/ui/HomePage/TopSaleProducts";
import CategoryAndSubCategory from "../Components/ui/HomePage/CategoryAndSubCategory";

export interface TSlides {
  img: string;
  text: string;
}
const CHomePage = ({ searchParams }: { searchParams?: any }) => {
  return (
    <div className="">

      <div className="mb-10 pt-4  w-full">
        <CategoryAndSubCategory />
      </div>
      {/* slider Section  */}
      <div>
        <EmblaCarousel searchParams={searchParams} />
      </div>
      {/* top sale  product */}
      <div className="my-10">
        <TopSaleProducts />
      </div>
    </div>
  );
};

export default CHomePage;
