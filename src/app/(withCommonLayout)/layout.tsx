import Footer from "@/src/Components/ui/Footer/Footer";
import CategoryAndSubCategory from "@/src/Components/ui/HomePage/CategoryAndSubCategory";
import { Navbar } from "@/src/Components/ui/Navbar";
import { childrenProps } from "@/src/Types";
import React from "react";

const CommonLayout = ({ children }: childrenProps) => {
  return (
    <div>
      <Navbar />
      <div className="mb-10 pt-20  w-full">
        <CategoryAndSubCategory />
      </div>
      <div className="">{children}</div>
      {/* footer section  */}
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default CommonLayout;
