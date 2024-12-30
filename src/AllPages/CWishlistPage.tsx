"use client";
import React, { useEffect, useState } from "react";
import {
  useFindHisAllWishlist,
  useSingleDeleteWishList,
} from "../hooks/user.hook";
import { TQueryParams } from "../Types/Filter/filter.type";
import ProductCard from "../Components/ui/Products/ProductCard";
import { RiDeleteBin5Line } from "react-icons/ri";
import NoFoundData from "../Components/ui/No Found/NoFoundData";
import ComponentsLoading from "../Components/ui/Loading/ComponentsLoading";
import infiniteScrollFn from "../utils/infiniteScrollFn";
import toast from "react-hot-toast";

const CWishlistPage = () => {
  const [params, setParams] = useState<TQueryParams[] | []>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { data, isLoading } = useFindHisAllWishlist(page, pageSize, [
    ...params,
  ]);

  const { mutate, isSuccess, isPending } = useSingleDeleteWishList();

  const handleRemove = (id: any) => {
    if (id) {
      mutate({ wishListId: id });
    }
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success("single wishlist deleted ");
    }
  }, [isSuccess]);

  infiniteScrollFn(page, setPage, data?.meta?.total, pageSize);
  return (
    <div>
      <div className="min-h-screen">
        {isPending ? (
          <ComponentsLoading />
        ) : (
          <div>
            {data?.result?.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3  gap-3">
                {data?.result?.map((item: any) => (
                  <div className="relative">
                    <ProductCard item={item?.product} showBuyButton={true} />
                    <button
                      onClick={() => handleRemove(item?.id)}
                      className="absolute top-0 right-0"
                    >
                      <RiDeleteBin5Line size={28} color="red" />
                    </button>
                  </div>
                ))}
              </div>
            ) : !isLoading ? (
              <NoFoundData />
            ) : (
              <ComponentsLoading />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CWishlistPage;
