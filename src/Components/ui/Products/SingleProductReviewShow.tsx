"use client";

import { usePublicSingleProductReview } from "@/src/hooks/product.hook";
import Image from "next/image";

const SingleProductReviewShow = ({ productId }: { productId: any }) => {
  const { data } = usePublicSingleProductReview(productId);

  return (
    <div className="p-4">
      {data?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.map((item: any, index: number) => (
            <div
              key={index}
              className="border border-gray-300 rounded-lg shadow-md p-4  flex flex-col gap-4"
            >
              <div className="flex items-center gap-4">
                <Image
                  src={item?.user?.userProfile?.[0]?.profilePhoto || "/default-avatar.png"}
                  alt={`${item?.user?.name}'s profile`}
                  width={50}
                  height={50}
                  className="rounded-full border border-primary"
                />
                <div>
                  <h3 className="text-lg font-semibold">{item?.user?.name || "Anonymous"}</h3>
                  <p className="text-sm text-white">
                    {new Date(item?.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-yellow-500 text-lg font-bold">{item?.rating}★</span>
              <p className="text-sm  italic">{`"${item?.userMessage}"`}</p>
              </div>
                <p className="">{item?.shopMessage || "No review message"}</p>
            </div>
          ))}
        </div>
      ) : (
        <span className="text-xl text-red-600 font-bold">No reviews available</span>
      )}
    </div>
  );
};

export default SingleProductReviewShow;
