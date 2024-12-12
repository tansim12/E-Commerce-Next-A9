"use client";
import { usePublicFlashSaleProducts } from "@/src/hooks/product.hook";
import { TQueryParams } from "@/src/Types/Filter/filter.type";
import React, { useState } from "react";
import Title from "../../Shared/Title";
import ProductCard from "../Products/ProductCard";
import TitleTopAnimation from "../../Shared/TitleTopAnimation";
import flashSale from "../../../assets/Animation/flash_sale.json";
import ProductSkeleton from "../../Shared/ProductSkeleton";
import NoFoundData from "../No Found/NoFoundData";
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
      {isProductDataPending && (
        <div className="flex flex-wrap gap-3 justify-center items-center">
          {" "}
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item: any) => (
            <ProductSkeleton />
          ))}
        </div>
      )}
      <div>
        <div className="mb-10">
          <Title mainText="">
            <TitleTopAnimation jsonFile={flashSale} isFlashSale={true} />{" "}
          </Title>
        </div>

        {productData?.result?.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-3">
          {productData?.result?.map((pd: any) => <ProductCard item={pd} isFlashSale={true} showBuyButton={true}/>)}
        </div>
      ) : (
        !isProductDataPending && <NoFoundData />
      )}

      </div>
    </div>
  );
};

export default FlashSaleProducts;
