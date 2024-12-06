"use client";
import { useState, useEffect } from "react";

// import { availableProduct, TProduct } from "../../types/products.type";
// import { discountPrice } from "../../utils/discountPrice";
// import { handleAddToCart } from "../../utils/addToCartFn";
// import { TCartData } from "../../types/addToCart.type";
import toast from "react-hot-toast";

// import { buyingData } from "../../Redux/Features/Check Out/checkOut.slice";
// import { addToCartAction } from "../../Redux/Features/AddToCart/addToCart.slice";
import { Button, Input, Tabs, Tab } from "@nextui-org/react";
import { Rating } from "@smastrom/react-rating";
// import ProductSlider from "./ProductSlider";
import ProductSlider from "../Components/ui/Slider/ProductSlider";
import { discountPrice } from "../utils/discountPrice";
import { FiImage } from "react-icons/fi";
import { RxAvatar } from "react-icons/rx";
import { IoSettingsOutline } from "react-icons/io5";
import { usePublicSingleProduct } from "../hooks/product.hook";

const CProductDetailsPage = ({ id }: { id: any }) => {
  //   const updateAddToCart = useAppDispatch();
 console.log(id);
 

  const {
    data: productData,
    isPending: isProductDataPending,
    isError: isProductDataError,
    isSuccess,
  } = usePublicSingleProduct(id);
  console.log(productData);
  
  //   const { id } = useParams();
  //   const { data } = useGetOneProductQuery(id);

  //   useEffect(() => {
  //     if (data?.data) {
  //       setProductData(data?.data);
  //     }
  //   }, [data?.data]);

  //   const navigate = useNavigate();

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
  const handleCheckOutPage = (item: Partial<any>) => {
    // updateBuyingData(
    //   buyingData([
    //     {
    //       _id: item?._id,
    //       name: item?.name,
    //       image: item?.image?.[0],
    //       quantity: item?.quantity,
    //       buyQuantity: buyQuantity,
    //       price: item?.price,
    //     },
    //   ])
    // );
    // navigate("/checkout");
  };

  return (
    <div className="container mx-auto my-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {/* Image section */}
        <div className="">
          <ProductSlider slides={productData?.image as string[]} />
        </div>
        {/* Product details section */}
        <div className="">
          <h1 className="text-2xl font-bold">{productData?.title}</h1>
          <div className="flex items-center mt-2">
            <Rating
              style={{ maxWidth: 250 }}
              value={productData?.averageRating}
            />

            <span className="ml-2 text-gray-600">
              ({productData?.order} orders)
            </span>
            {productData?.isAvailable === true && (
              <span className="ml-2 text-green-600">In stock</span>
            )}

            {productData?.availability !== true && (
              <span className="ml-2 text-red-600">Stock Out</span>
            )}
          </div>
          <div className="mt-4">
            <span className="text-3xl font-bold">
              {discountPrice(productData?.price, productData?.discount)}৳
            </span>
            <span className="text-gray-600"> / per item</span>
          </div>
          <p className="mt-4 text-gray-700">
            {productData?.title?.slice(0, 100)} <br />
            <span>{productData?.shortDescription?.slice(0, 300)}</span>
          </p>
          <div className="mt-4">
            <div className="flex items-center mb-2">
              <span className="w-24 font-semibold">Category:</span>
              <span>{productData?.category}</span>
            </div>
            <div className="flex items-center mb-2">
              <span className="w-24 font-semibold ">Type:</span>
              <span>{productData?.type}</span>
            </div>
            <div className="flex items-center mb-2">
              <span className="w-24 font-semibold ">Color:</span>
              {productData?.color?.length &&
                productData?.color?.map((item: any) => (
                  <span key={item}>{item}, </span>
                ))}
            </div>
            <div className="flex items-center mb-2">
              <span className="w-24 font-semibold ">Material:</span>
              <span>{productData?.materials}</span>
            </div>
            <div className="flex items-center mb-2">
              <span className="w-24 font-semibold">Brand:</span>
              <span>Reebok</span>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center mb-1">
              <span className="w-24">Quantity:</span>
              <Input
                type="number"
                min={1}
                value={buyQuantity as never}
                onChange={(e) => setBuyQuantity(e.target.valueAsNumber)}
              />
            </div>
            <p>
              {buyQuantity > (productData?.quantity as number) && (
                <span className="text-red-600">
                  This product quantity is out of stock. Available:{" "}
                  {productData?.quantity}
                </span>
              )}
            </p>
          </div>
          <div className="mt-4 flex space-x-4">
            <Button
              disabled={productData?.isAvailable !== true}
              onClick={() => handleCheckOutPage(productData)}
              color="primary"
            >
              Buy Now
            </Button>
            <Button
              disabled={productData?.isAvailable !== true}
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

      <div className="border-b mt-8">
        <div className="container mx-auto px-4">
          <Tabs aria-label="Profile Tabs" color="primary" variant="bordered">
            <Tab
              key="activities"
              title={
                <div className="flex items-center space-x-2">
                  <FiImage /> {/* Image icon */}
                  <span>Activities</span>
                </div>
              }
            >
              activities
            </Tab>
            <Tab
              key="Followers"
              title={
                <div className="flex items-center space-x-2">
                  <RxAvatar />
                  {/* Music icon */}
                  <span>Followers</span>
                </div>
              }
            >
              followers
            </Tab>
            <Tab
              key="Settings"
              title={
                <div className="flex items-center space-x-2">
                  <IoSettingsOutline />
                  {/* Video icon */}
                  <span>Settings</span>
                </div>
              }
            >
              {/* Videos Content (You can replace this with actual content) */}
              <div className="text-center py-10">
                <span>user info</span>
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default CProductDetailsPage;
