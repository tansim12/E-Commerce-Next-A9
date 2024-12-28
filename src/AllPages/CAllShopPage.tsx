"use client";
import React, { useState } from "react";
import { usePublicAllShop } from "../hooks/shop.hook";
import NoFoundData from "../Components/ui/No Found/NoFoundData";
import ShopProfile from "../Components/ui/Shop/ShopProfile";
import ComponentsLoading from "../Components/ui/Loading/ComponentsLoading";
import infiniteScrollFn from "../utils/infiniteScrollFn";

const CAllShopPage = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { data, isLoading } = usePublicAllShop(page, pageSize, []);
  console.log({ data: data?.result });
  infiniteScrollFn(page, setPage, data?.meta?.total, pageSize);
  return (
    <div className="min-h-[70vh]">
      {data?.result?.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {data?.result?.map((item: any) => (
            <ShopProfile key={item?.id} item={item} />
          ))}
        </div>
      ) : !isLoading ? (
        <NoFoundData />
      ) : (
        <ComponentsLoading />
      )}
    </div>
  );
};

export default CAllShopPage;
