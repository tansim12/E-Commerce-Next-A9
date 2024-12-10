"use client";
import React, { useEffect, useState } from "react";
import {
  getHistoryData,
  removeHistoryProductsLC,
} from "../utils/productHistorySaveLC";
import { useGetCompareProducts } from "../hooks/product.hook";
import ProductCard from "../Components/ui/Products/ProductCard";
import toast from "react-hot-toast";
import { RiDeleteBin5Line } from "react-icons/ri";

const CHistoryPage = () => {
  const [compareIds, setCompareIds] = useState([]);
  const [change, setChange] = useState(false);

  useEffect(() => {
    const result = getHistoryData();
    setCompareIds(result);
  }, [change]);

  const ids = compareIds?.map((item: any) => item?.productId);
  const { data: products, isLoading } = useGetCompareProducts(ids ? ids : []);

  const handleRemove = (id: any) => {
    const result = removeHistoryProductsLC(id);
    if (result?.status === 200) {
      toast.success(result?.message);
      setChange((pre: any) => !pre);
    } else {
      toast.error(result);
    }
  };

  return (
    <>
      <div>
        <div>
          {products?.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {products?.map((item: any) => (
                <div className="relative">
                  <ProductCard item={item} showBuyButton={true} />
                  <button
                    onClick={() => handleRemove(item?.id)}
                    className="absolute top-0 right-0"
                  >
                    <RiDeleteBin5Line size={28} color="red" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <span>No data</span>
          )}
        </div>
      </div>
    </>
  );
};

export default CHistoryPage;
