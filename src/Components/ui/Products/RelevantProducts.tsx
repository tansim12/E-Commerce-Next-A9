"use client";

import { usePublicRelevantProducts } from "@/src/hooks/product.hook";
import { getHistoryData } from "@/src/utils/productHistorySaveLC";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

const RelevantProducts = () => {
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

  const { data, isLoading, isSuccess } = usePublicRelevantProducts(
    ids?.length > 0 ? ids : [],
    page,
    pageSize,
    []
  );
  console.log({ data });

  return (
    <>
      <div className="my-28">
        <div>
            <p className="text-3xl text-center my-10 font-bold">Your Products</p>
        </div>
        {data?.result?.length ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {data?.result?.map((item: any) => <ProductCard item={item} />)}
          </div>
        ) : (
          <span className="text-center text-2xl">No Data </span>
        )}
      </div>
    </>
  );
};

export default RelevantProducts;
