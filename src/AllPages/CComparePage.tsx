"use client";
import { useEffect, useState } from "react";
import CompareActionButton from "../Components/ui/Products/CompareActionButton";
import { getCompareProductLC } from "../utils/getComparProductLC";
import { useGetCompareProducts } from "../hooks/product.hook";
import ComponentsLoading from "../Components/ui/Loading/ComponentsLoading";

const CComparePage = () => {
  const [compareIds, setCompareIds] = useState([]);

  useEffect(() => {
    const savedProducts = getCompareProductLC();
    setCompareIds(savedProducts);
  }, []);
  const ids = compareIds?.map((item: any) => item?.productId);

  const { data: products, isLoading } = useGetCompareProducts(ids ? ids : []);
  return (
    <>
      {isLoading && <ComponentsLoading />}
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Compare Products
        </h1>
        {products?.length > 0 ? (
          <div className="overflow-x-scroll">
            <table className="table-auto border-collapse w-full">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Attribute</th>
                  {products?.map((product: any) => (
                    <th key={product?.id} className="border px-4 py-2">
                      <div className="flex flex-col items-center">
                        <img
                          src={product?.images[0]}
                          alt={product?.productName}
                          className="w-32 h-32 object-cover mb-2"
                        />
                        <p className="font-semibold">{product?.productName}</p>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* Price */}
                <tr>
                  <td className="border px-4 py-2">Price</td>
                  {products?.map((product: any) => (
                    <td key={product?.id} className="border px-4 py-2">
                      {product?.price} BDT
                    </td>
                  ))}
                </tr>

                {/* Discount */}
                <tr>
                  <td className="border px-4 py-2">Discount</td>
                  {products?.map((product: any) => (
                    <td key={product?.id} className="border px-4 py-2">
                      {product?.discount ? `${product?.discount} BDT` : "N/A"}
                    </td>
                  ))}
                </tr>

                {/* Flash Sale */}
                <tr>
                  <td className="border px-4 py-2">Flash Sale Discount</td>
                  {products?.map((product: any) => (
                    <td key={product?.id} className="border px-4 py-2">
                      {product?.isFlashSaleOffer
                        ? `${product?.flashSaleDiscount} BDT`
                        : "N/A"}
                    </td>
                  ))}
                </tr>

                {/* Description */}
                <tr>
                  <td className="border px-4 py-2">Description</td>
                  {products?.map((product: any) => (
                    <td key={product?.id} className="border px-4 py-2">
                      <div
                        className="text-sm"
                        dangerouslySetInnerHTML={{
                          __html: product?.description,
                        }}
                      />
                    </td>
                  ))}
                </tr>

                {/* Availability */}
                <tr>
                  <td className="border px-4 py-2">Availability</td>
                  {products?.map((product: any) => (
                    <td
                      key={product?.id}
                      className={`border px-4 py-2 ${
                        product?.isAvailable ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {product?.isAvailable ? "In Stock" : "Out of Stock"}
                    </td>
                  ))}
                </tr>

                {/* Ratings */}
                <tr>
                  <td className="border px-4 py-2">Average Rating</td>
                  {products?.map((product: any) => (
                    <td key={product?.id} className="border px-4 py-2">
                      {product?.averageRating || "No Ratings Yet"}
                    </td>
                  ))}
                </tr>

                {/* Total Purchases */}
                <tr>
                  <td className="border px-4 py-2">Total Purchases</td>
                  {products?.map((product: any) => (
                    <td key={product?.id} className="border px-4 py-2">
                      {product?.totalBuy}
                    </td>
                  ))}
                </tr>

                {/* Category */}
                <tr>
                  <td className="border px-4 py-2">Category</td>
                  {products?.map((product: any) => (
                    <td key={product?.id} className="border px-4 py-2">
                      {product?.category?.categoryName}
                    </td>
                  ))}
                </tr>

                {/* Created At */}
                <tr>
                  <td className="border px-4 py-2">Created At</td>
                  {products.map((product: any) => (
                    <td key={product?.id} className="border px-4 py-2">
                      {new Date(product?.createdAt).toLocaleDateString()}
                    </td>
                  ))}
                </tr>
                {/* Created At */}
                <tr>
                  <td className="border px-4 py-2">Action</td>
                  {products.map((product: any) => (
                    <td key={product?.id} className="border px-4 py-2">
                      <CompareActionButton product={product} />
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <span>Hello</span>
        )}
      </div>
    </>
  );
};

export default CComparePage;
