"use client";
import React, { useState } from "react";
import Title from "../../Shared/Title";
import TitleTopAnimation from "../../Shared/TitleTopAnimation";
import ProductCard from "../Products/ProductCard";
import { usePublicTopSaleProducts } from "@/src/hooks/product.hook";
import { TQueryParams } from "@/src/Types/Filter/filter.type";
import top10 from "../../../assets/Animation/topSell.json";
const TopSaleProducts = () => {
  const [searchValue, setSearchValue] = useState("");
  const [params, setParams] = useState<TQueryParams[] | []>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const {
    data: productData,
    isPending: isProductDataPending,
    isError: isProductDataError,
    isSuccess,
  } = usePublicTopSaleProducts(page, pageSize, [...params]);



  return (
    <div>
      <div className="mb-10">
        <Title mainText="Best Selling">
          <TitleTopAnimation jsonFile={top10} />{" "}
        </Title>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-3">
        {productData?.result?.map((pd: any) => <ProductCard item={pd} />)}
      </div>
    </div>
  );
};

export default TopSaleProducts;
