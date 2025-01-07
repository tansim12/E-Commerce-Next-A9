"use client";

import { usePublicRelevantProducts } from "@/src/hooks/product.hook";
import { getHistoryData } from "@/src/utils/productHistorySaveLC";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import infiniteScrollFn from "@/src/utils/infiniteScrollFn";
import NoFoundData from "../No Found/NoFoundData";

const RelevantProducts = () => {
  const [allProductsData, setAllProductsData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [compareIds, setCompareIds] = useState([]);
  const [change, setChange] = useState(false);

  useEffect(() => {
    const result = getHistoryData();
    setCompareIds(result);
  }, [change]);
  const ids = Array.from(
    new Set(compareIds?.map((item: any) => item?.categoryId))
  );

  const { data, isPending, isSuccess } = usePublicRelevantProducts(
    ids?.length > 0 ? ids : [],
    page,
    pageSize,
    []
  );
  useEffect(() => {
    if (data?.result) {
      if (page > 1) {
        setAllProductsData((prevData) => [...prevData, ...data?.result] as any);
      } else {
        setAllProductsData([...data?.result] as any);
      }
    }
  }, [data, page]);
  infiniteScrollFn(page, setPage, data?.meta?.total, pageSize);

  return (
    <>
      <div className="mt-28 mb-16">
        <div>
          <p className="text-3xl text-center my-16 font-bold">Your Relevant Products</p>
        </div>
        {allProductsData?.length ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5  gap-3">
            {allProductsData?.map((item: any) => <ProductCard item={item} />)}
          </div>
        ) : (
          !isPending && <NoFoundData />
        )}
      </div>
    </>
  );
};

export default RelevantProducts;
