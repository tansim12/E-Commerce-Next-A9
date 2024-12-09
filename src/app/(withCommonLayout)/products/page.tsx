import CProductsPage from "@/src/AllPages/CProductsPage";
import React from "react";

const ProductsPage = ({ searchParams }: { searchParams: any }) => {
  return (
    <div>
      <CProductsPage searchParams={searchParams} />
    </div>
  );
};

export default ProductsPage;
