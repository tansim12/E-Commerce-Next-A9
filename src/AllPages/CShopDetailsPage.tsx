"use client";
import React, { useEffect, useState } from "react";
import { TQueryParams } from "../Types/Filter/filter.type";
import { usePublicFindSingleShop } from "../hooks/shop.hook";
import Image from "next/image";
import { Rating } from "@smastrom/react-rating";
import moment from "moment";
import ProductCard from "../Components/ui/Products/ProductCard";
import infiniteScrollFn from "../utils/infiniteScrollFn";
import ComponentsLoading from "../Components/ui/Loading/ComponentsLoading";
import ShopFollowButton from "../Components/ui/Shop/ShopFollowButton";

const CShopDetailsPage = ({ params: urlParams }: { params: any }) => {
  const [allProductsData, setAllProductsData] = useState([]);
  const [params, setParams] = useState<TQueryParams[] | []>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const {
    data: shopData,
    isPending: isShopDataPending,
    isError: isShopDataError,
    isSuccess,
  } = usePublicFindSingleShop(urlParams?.id, page, pageSize, [...params]);

  const data = shopData?.result;
  const shopProducts = shopData?.result?.product;

  useEffect(() => {
    if (shopData?.result?.product) {
      if (page > 1) {
        setAllProductsData(
          (prevData) => [...prevData, ...shopData?.result?.product] as any
        );
      } else {
        setAllProductsData([...shopData?.result?.product] as any);
      }
    }
  }, [shopData?.result?.product, page]);
  infiniteScrollFn(page, setPage, shopData?.meta?.total, pageSize);

  return (
    <>
      {isShopDataPending && <ComponentsLoading />}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 justify-between items-center">
        {/* shop details div  */}
        <div>
          <div className="">
            <h1 className="text-2xl font-bold">{data?.name}</h1>
            <div className="flex items-center mt-2">
              <Rating style={{ maxWidth: 150 }} value={data?.averageRating} />

              <span className="ml-2 text-gray-600">
                ({data?._count?.payment} orders)
              </span>
              {data?.isDelete === false && (
                <span className="ml-2 text-green-600"> Active</span>
              )}

              {data?.isDelete === true && (
                <span className="ml-2 text-red-600"> Deleted</span>
              )}
            </div>

            <div className="mt-4">
              <div className="flex items-center mb-2">
                <span className=" font-semibold mr-3">Shop Type:</span>
                <span> {data?.shopType}</span>
              </div>

              <div className="flex items-center mb-2">
                <span className=" font-semibold mr-3">Contact Number:</span>
                <span>
                  {" "}
                  {data?.contactNumber ? data?.contactNumber : "N/A"}
                </span>
              </div>

              <div className="flex items-center mb-2">
                <span className=" font-semibold mr-3">Address :</span>
                <span> {data?.address ? data?.address : "N/A"}</span>
              </div>
              <div className="flex items-center mb-2">
                <span className=" font-semibold mr-3">Shop Register : </span>
                <span> {moment(data?.createdAt).format("ll")}</span>
              </div>
              <div className="flex items-center mb-2">
                <span className=" font-semibold mr-3">Shop Followers : </span>
                <span>{data?._count?.shopFollow}</span>
              </div>
            </div>
          </div>
        </div>

        {/* shop logo  */}
        <div>
          <div>
            <div className="flex items-center justify-center my-5">
              <img
                className="object-contain rounded-full"
                alt="shop"
                src={
                  "https://i.ibb.co/59Qnc32/istockphoto-519319260-612x612.jpg"
                }
              />
            </div>
            <div className="flex justify-center items-center my-3">
              <ShopFollowButton shopId={data?.id} />
            </div>

            <div
              className="text-center"
              dangerouslySetInnerHTML={{
                __html: data?.description ? data?.description : "N/A",
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* product show div  */}
      <div className="my-10">
        <p className="text-2xl text-center font-bold mb-10">Shop Products </p>
        {allProductsData?.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {allProductsData?.map((item: any) => (
              <ProductCard item={item} showBuyButton={true} />
            ))}
          </div>
        ) : (
          <span>There is no products</span>
        )}
      </div>
    </>
  );
};

export default CShopDetailsPage;

