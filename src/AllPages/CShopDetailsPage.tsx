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

// const data = {
//   id: "b4c4e012-5e67-4ed2-af9f-f3ecb170207e",
//   name: "Shopno",
//   vendorId: "3ec29976-46e5-4745-ac69-e72885508a09",
//   description:
//     '<p><span style="background-color: rgb(13, 17, 23); color: rgb(240, 246, 252);">their shops and inventories, and administrators can control and monitor the entire system. The application focuses on being intuitive, responsive, and secure, providing a seamless experience for all user roles.&nbsp;The core of this project is to build a scalable, high-performance system using modern web development technologies. It leverages Node.js and Express.js for the backend, React.js (or Next.js) for the front end, and PostgreSQL for data storage. The application integrates with third-party services for payments and file storage, ensuring a professional,</span></p>',
//   averageRating: 0,
//   isDelete: false,
//   logo: "https://i.ibb.co/59Qnc32/istockphoto-519319260-612x612.jpg",
//   shopType: "e-commerce",
//   address: "Pabna Sadar",
//   contactNumber: "01849184000",
//   createdAt: "2024-12-05T07:03:14.643Z",
//   updatedAt: "2024-12-06T09:58:00.668Z",
//   shopReview: [],
//   vendor: {
//     name: "v4",
//     email: "v4@gmail.com",
//     userProfile: [
//       {
//         profilePhoto: null,
//       },
//     ],
//   },
//   shopFollow: [],
//   _count: {
//     shopReview: 0,
//     shopFollow: 0,
//     product: 7,
//     payment: 25,
//   },
// };
