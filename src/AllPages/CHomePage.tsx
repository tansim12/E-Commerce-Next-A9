import React from "react";
import dynamic from "next/dynamic";
import PublicReview from "../Components/ui/Review/PublicReview";
import { NewsletterSubscription } from "../Components/ui/NewsLetter/NewsletterSubscription";
import { Banner } from "../Components/ui/Banner/Banner";

const TopSaleProducts = dynamic(
  () => import("../Components/ui/HomePage/TopSaleProducts"),
  { ssr: false }
);
const FlashSaleProducts = dynamic(
  () => import("../Components/ui/HomePage/FlashSaleProducts"),
  { ssr: false }
);
const ScrollToTopButton = dynamic(
  () => import("../Components/ui/ScrollTopButton/ScrollToTopButton"),
  { ssr: false }
);
const RelevantProducts = dynamic(
  () => import("../Components/ui/Products/RelevantProducts"),
  { ssr: false }
);

export interface TSlides {
  img: string;
  text: string;
}
const CHomePage = () => {
  return (
    <div className="relative">
      {/* slider Section  */}
      <div className="h-[50vh] ">
        {/* <EmblaCarousel /> */}
        <Banner />
      </div>
      {/* top sale  product */}
      <div className="my-10 container mx-auto px-2 sm:px-2">
        <TopSaleProducts />
      </div>
      {/* flash sale product */}
      <div className="my-24 container mx-auto px-2 sm:px-2">
        <FlashSaleProducts />
      </div>

      {/* scroll button  */}
      <div className="absolute container mx-auto px-2 sm:px-2">
        <ScrollToTopButton />
      </div>

      {/* relevant products  */}
      <div className="container mx-auto px-2 sm:px-2">
        <RelevantProducts />
      </div>
      <div className="container mx-auto px-2 sm:px-2">
        <NewsletterSubscription />
      </div>
      <div className="container mx-auto px-2 sm:px-2">
        <PublicReview />
      </div>
    </div>
  );
};

export default CHomePage;
