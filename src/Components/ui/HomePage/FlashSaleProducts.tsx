"use client";
import { usePublicFlashSaleProducts } from "@/src/hooks/product.hook";
import { TQueryParams } from "@/src/Types/Filter/filter.type";
import React, { useState } from "react";
import Title from "../../Shared/Title";
import ProductCard from "../Products/ProductCard";
import TitleTopAnimation from "../../Shared/TitleTopAnimation";
import flashSale from "../../../assets/Animation/flash_sale.json";
const FlashSaleProducts = () => {
  const [searchValue, setSearchValue] = useState("");
  const [params, setParams] = useState<TQueryParams[] | []>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const {
    data: productData,
    isPending: isProductDataPending,
    isError: isProductDataError,
    isSuccess,
  } = usePublicFlashSaleProducts(page, pageSize, [...params]);
  console.log(productData);

  return (
    <div>
      <div>
        <div className="mb-10">
          <Title mainText="">
            <TitleTopAnimation jsonFile={flashSale} isFlashSale={true} />{" "}
          </Title>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-5  gap-3">
          {productData?.result?.map((pd: any) => (
            <ProductCard item={pd} isFlashSale={true} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FlashSaleProducts;
