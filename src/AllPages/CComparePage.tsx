import React from "react";
import NewCustomButton from "../Components/ui/Products/NewCustomButton";
import CompareActionButton from "../Components/ui/Products/CompareActionButton";

interface Product {
  id: string;
  productName: string;
  quantity: number;
  isAvailable: boolean;
  totalBuy: number;
  price: number;
  discount: number | null;
  promo: string | null;
  isActivePromo: boolean;
  isFlashSaleOffer: boolean;
  flashSaleDiscount: number;
  flashSaleStartDate: string | null;
  flashSaleEndDate: string | null;
  shopId: string;
  description: string;
  totalSubmitRating: number;
  averageRating: number;
  images: string[];
  categoryId: string;
  subCategoryId: string;
  isDelete: boolean;
  createdAt: string;
  updatedAt: string;
  category: {
    id: string;
    categoryName: string;
    adminId: string;
    isDelete: boolean;
    createdAt: string;
    updatedAt: string;
  };
}

interface ComparePageProps {
  products: Product[];
}

const CComparePage: React.FC<ComparePageProps> = ({ products }) => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Compare Products</h1>
      <div className="overflow-x-scroll">
        <table className="table-auto border-collapse w-full">
          <thead>
            <tr>
              <th className="border px-4 py-2">Attribute</th>
              {products?.map((product) => (
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
              {products?.map((product) => (
                <td key={product?.id} className="border px-4 py-2">
                  {product?.price} BDT
                </td>
              ))}
            </tr>

            {/* Discount */}
            <tr>
              <td className="border px-4 py-2">Discount</td>
              {products?.map((product) => (
                <td key={product?.id} className="border px-4 py-2">
                  {product?.discount ? `${product?.discount}%` : "N/A"}
                </td>
              ))}
            </tr>

            {/* Flash Sale */}
            <tr>
              <td className="border px-4 py-2">Flash Sale Discount</td>
              {products?.map((product) => (
                <td key={product?.id} className="border px-4 py-2">
                  {product?.isFlashSaleOffer
                    ? `${product?.flashSaleDiscount}%`
                    : "N/A"}
                </td>
              ))}
            </tr>

            {/* Description */}
            <tr>
              <td className="border px-4 py-2">Description</td>
              {products?.map((product) => (
                <td key={product?.id} className="border px-4 py-2">
                  <div
                    className="text-sm"
                    dangerouslySetInnerHTML={{ __html: product?.description }}
                  />
                </td>
              ))}
            </tr>

            {/* Availability */}
            <tr>
              <td className="border px-4 py-2">Availability</td>
              {products?.map((product) => (
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
              {products?.map((product) => (
                <td key={product?.id} className="border px-4 py-2">
                  {product?.averageRating || "No Ratings Yet"}
                </td>
              ))}
            </tr>

            {/* Total Purchases */}
            <tr>
              <td className="border px-4 py-2">Total Purchases</td>
              {products?.map((product) => (
                <td key={product?.id} className="border px-4 py-2">
                  {product?.totalBuy}
                </td>
              ))}
            </tr>

            {/* Category */}
            <tr>
              <td className="border px-4 py-2">Category</td>
              {products?.map((product) => (
                <td key={product?.id} className="border px-4 py-2">
                  {product?.category?.categoryName}
                </td>
              ))}
            </tr>

            {/* Created At */}
            <tr>
              <td className="border px-4 py-2">Created At</td>
              {products.map((product) => (
                <td key={product?.id} className="border px-4 py-2">
                  {new Date(product?.createdAt).toLocaleDateString()}
                </td>
              ))}
            </tr>
            {/* Created At */}
            <tr>
              <td className="border px-4 py-2">Action</td>
              {products.map((product) => (
                <td key={product?.id} className="border px-4 py-2">
                  <CompareActionButton product={product} />
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CComparePage;
