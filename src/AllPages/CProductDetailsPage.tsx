"use client";
import { useState, useEffect } from "react";

import toast from "react-hot-toast";
import { GoCodeReview } from "react-icons/go";
import { Button, Input, Tabs, Tab } from "@nextui-org/react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
// import ProductSlider from "./ProductSlider";
import ProductSlider from "../Components/ui/Slider/ProductSlider";
import { discountPrice } from "../utils/discountPrice";
import { FiImage } from "react-icons/fi";
import { RxAvatar } from "react-icons/rx";
import { IoSettingsOutline } from "react-icons/io5";
import { usePublicSingleProduct } from "../hooks/product.hook";
import { useRouter } from "next/navigation";
import { BsShop } from "react-icons/bs";
import ShopProfile from "../Components/ui/Shop/ShopProfile";
import { trackViewedProduct } from "../utils/productHistorySaveLC";


const CProductDetailsPage = ({ id }: { id: any }) => {
  const router = useRouter();

  const {
    data: productData,
    isPending: isProductDataPending,
    isError: isProductDataError,
    isSuccess,
  } = usePublicSingleProduct(id);

  const relatedProductData = productData?.relatedProduct;
  const productDetails = productData?.result;

  useEffect(() => {
    trackViewedProduct(productDetails?.id, productDetails?.shopId);
  }, [productDetails]);

  // const {result, resentProducts} = productData

  const [buyQuantity, setBuyQuantity] = useState(1);
  //   const handleAddToCartButton = (data: Partial<any>) => {
  //     updateAddToCart(addToCartAction("increment"));
  //     const result = handleAddToCart(data);
  //     if (result?.status === true) {
  //       toast.success(result?.message);
  //     } else {
  //       toast?.error(result?.message);
  //     }
  //   };

  //   const updateBuyingData = useAppDispatch();
  // handleCheckOutPage
  const handleCheckOutPage = (item: Partial<any>) => {};

  return (
    <div className="container mx-auto ">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {/* Image section */}
        <div className="">
          <ProductSlider slides={productDetails?.images as string[]} />
        </div>
        {/* Product details section */}
        <div className="">
          <h1 className="text-2xl font-bold">{productDetails?.productName}</h1>
          <div className="flex items-center mt-2">
            <Rating
              style={{ maxWidth: 150 }}
              value={productDetails?.averageRating}
            />

            <span className="ml-2 text-gray-600">
              ({productDetails?.totalBuy} orders)
            </span>
            {productDetails?.isAvailable === true && (
              <span className="ml-2 text-green-600">In stock</span>
            )}

            {productDetails?.isAvailable !== true && (
              <span className="ml-2 text-red-600">Stock Out</span>
            )}
          </div>
          <div className="mt-4">
            <span className="text-3xl font-bold">
              {discountPrice(productDetails?.price, productDetails?.discount)}৳
            </span>
            <span className="text-gray-600"> / per item</span>
          </div>

          <div className="mt-4">
            <div className="flex items-center mb-2">
              <span className="w-24 font-semibold">Category:</span>
              <span>{productData?.category}</span>
            </div>
            <div className="flex items-center mb-2">
              <span className="w-24 font-semibold ">Category:</span>
              <span>
                {productDetails?.category?.categoryName
                  ? productDetails?.category?.categoryName
                  : "N/A"}
              </span>
            </div>
            <div className="flex items-center mb-2">
              <span className="w-24 font-semibold ">S. Category:</span>
              <span>
                {productDetails?.subCategory?.categoryName
                  ? productDetails?.subCategory?.categoryName
                  : "N/A"}
              </span>
            </div>
            <div className="flex items-center mb-2">
              <span className="w-24 font-semibold ">Promo:</span>
              <span>
                {productDetails?.promo &&
                productDetails?.isFlashSaleOffer &&
                productDetails?.isActivePromo
                  ? productDetails?.promo
                  : "N/A"}
              </span>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center mb-1">
              <span className="w-24">Quantity:</span>
              <Input
                className="w-32"
                type="number"
                min={1}
                value={buyQuantity as never}
                onChange={(e: any) => setBuyQuantity(e.target.valueAsNumber)}
              />
            </div>
            <p>
              {buyQuantity > (productDetails?.quantity as number) && (
                <span className="text-red-600">
                  This product quantity is out of stock. Available:{" "}
                  {productDetails?.quantity}
                </span>
              )}
            </p>
          </div>
          <div className="mt-4 flex space-x-4">
            <Button
              disabled={
                productDetails?.isAvailable !== true ||
                buyQuantity > (productDetails?.quantity as number)
              }
              onClick={() => handleCheckOutPage(productDetails)}
              color="primary"
            >
              Buy Now
            </Button>
            <Button
              disabled={
                productDetails?.isAvailable !== true ||
                buyQuantity > (productDetails?.quantity as number)
              }
              //   onClick={() =>
              //     handleAddToCartButton({
              //       _id: productData?._id,
              //       image: productData?.image?.[0],
              //       buyQuantity: buyQuantity,
              //       name: productData?.name,
              //       price: discountPrice(
              //         productData?.price,
              //         productData?.discount
              //       ),
              //       quantity: productData?.quantity,
              //     })
              //   }
            >
              Add to Cart
            </Button>
            <Button>Save</Button>
          </div>
        </div>
      </div>

      {/* Tabs Section */}

      <div className="border-b my-8 min-h-[40vh]">
        <div className="container mx-auto px-4">
          <Tabs aria-label="Profile Tabs" color="primary" variant="bordered">
            <Tab
              key="Details"
              title={
                <div className="flex items-center space-x-2">
                  <FiImage /> {/* Image icon */}
                  <span>Details</span>
                </div>
              }
            >
              <div className="flex justify-between">
                {/* details div  */}
                <div className="p-3 flex-1 w-2/3">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: productDetails?.description,
                    }}
                  ></div>
                </div>
                {/* raging div  */}
                <div className="w-1/3">
                  <div>
                    <span className="text-[70px] font-bold italic">
                      {Math.ceil(productDetails?.averageRating).toFixed(2)}
                    </span>
                    <span>Raging</span>
                    <Rating
                      style={{ maxWidth: 150 }}
                      value={productDetails?.averageRating}
                    />
                  </div>
                </div>
              </div>
            </Tab>
            <Tab
              key="Shop"
              title={
                <div className="flex items-center space-x-2">
                  <BsShop />
                  {/* Music icon */}
                  <span>Shop</span>
                </div>
              }
            >
              {/* shop profile  */}
              <div>
                <ShopProfile item={productDetails?.shop} />
              </div>
            </Tab>
            <Tab
              key="Review"
              title={
                <div className="flex items-center space-x-2">
                  <GoCodeReview />
                  {/* Video icon */}
                  <span>Review</span>
                </div>
              }
            >
              {/* // todo review section  */}
              <div className="text-center py-10">
                <span>Review</span>
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default CProductDetailsPage;
