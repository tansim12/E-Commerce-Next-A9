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

const CProductsPage = ({ searchParams }: { searchParams: any }) => {
  const newParams = Object.entries(searchParams).map(([key, value]) => ({
    name: key,
    value: value,
  }));
  console.log(newParams);

  const { params } = useUser();
  const [allPostData, setAllPostData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);

  const { data, isLoading, isSuccess } = usePublicAllProducts(
    page,
    pageSize,
    // params
    [...params, ...(newParams as TQueryParams[])]
  );
  console.log(params);

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
    <div>
      {allPostData?.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-2 md:gap-4">
          {allPostData?.length &&
            allPostData?.map((item: TPost) => (
              // <Post key={item?._id} post={item} />
              <ProductCard item={item} showBuyButton={true} />
            ))}
        </div>
      ) : (
        !isLoading && <NoFoundData />
      )}

      {isLoading && !isSuccess && (
        <div className="w-full flex justify-center items-center my-10">
          <Spinner label="Loading..." color="success" labelColor="success" />
        </div>
      )}
    </div>
  );
};

export default CProductsPage;
