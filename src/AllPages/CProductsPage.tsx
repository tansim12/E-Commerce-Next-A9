"use client";

import { TPost } from "@/src/Types/Posts/post.type";
import React, { useEffect, useState } from "react";

import infiniteScrollFn from "@/src/utils/infiniteScrollFn";
import { Spinner } from "@nextui-org/react";
import { useUser } from "@/src/Context/user.context";
import NoFoundData from "../Components/ui/No Found/NoFoundData";
import { usePublicAllProducts } from "../hooks/product.hook";
import ProductCard from "../Components/ui/Products/ProductCard";
import { TQueryParams } from "../Types/Filter/filter.type";
import ProductSkeleton from "../Components/Shared/ProductSkeleton";

const CProductsPage = ({ searchParams }: { searchParams: any }) => {
  const newParams = Object.entries(searchParams).map(([key, value]) => ({
    name: key,
    value: value,
  }));

  const { params } = useUser();
  const [allPostData, setAllPostData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);

  const { data, isPending, isSuccess } = usePublicAllProducts(
    page,
    pageSize,
    // params
    [...params, ...(newParams as TQueryParams[])]
  );

  // Handle params change
  useEffect(() => {
    // Reset page and scroll to top when params change
    setPage(1);
    window.scrollTo(0, 0);
    if (params?.length < 1) {
      setAllPostData(data?.result); // Clear previous data
    } else {
      setAllPostData([]);
    }
  }, [params]);

  useEffect(() => {
    if (data?.result) {
      if (page > 1) {
        setAllPostData((prevData) => [...prevData, ...data?.result] as any);
      } else {
        setAllPostData([...data?.result] as any);
      }
    }
  }, [data, page]);

  infiniteScrollFn(page, setPage, data?.meta?.total, pageSize);

  return (
    <>
    {isPending && (
        <div className="flex flex-wrap gap-3 justify-center items-center">
          {" "}
          {[1, 2, 3, 4, 5, 6].map((item: any) => (
            <ProductSkeleton />
          ))}
        </div>
      )}
      <div>
        {allPostData?.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3">
            {allPostData?.length &&
              allPostData?.map((item: TPost) => (
                // <Post key={item?._id} post={item} />
                <ProductCard item={item} showBuyButton={true} />
              ))}
          </div>
        ) : (
          !isPending && <NoFoundData />
        )}

       
      </div>
    </>
  );
};

export default CProductsPage;
