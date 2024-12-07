import { Tooltip } from "@nextui-org/react";
import { useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { TbListDetails } from "react-icons/tb";
// import Button from "../../Re-useable/Button";
// import { ICard } from "../../../types/card.type";
// import { discountPrice } from "../../../utils/discountPrice";
// import { handleAddToCart } from "../../../utils/addToCartFn";
import toast from "react-hot-toast";
import { discountPrice } from "@/src/utils/discountPrice";
import Image from "next/image";
import { useRouter } from "next/navigation";
// import { TCartData } from "../../../types/addToCart.type";
// import { availableProduct, TProduct } from "../../../types/products.type";
// import { useAppDispatch } from "../../../Redux/hook";
// import { addToCartAction } from "../../../Redux/Features/AddToCart/addToCart.slice";

const ProductCard = ({ showBuyButton, item }: any) => {
  //   const updateAddToCart = useAppDispatch();
  const [hoverOption, setHoverOption] = useState(false);
  const router = useRouter()

  const handleMouseEnter = () => {
    setHoverOption(true);
  };

  const handleMouseLeave = () => {
    setHoverOption(false);
  };

  const clickDetailsPage = (id: string) => {
    router.push(`/products/${id}`)
  };

  //   const handleAddToCartButton = (data: any) => {
  //     const result = handleAddToCart(data);
  //     if (result?.status === true) {
  //       toast.success(result?.message);
  //     } else {
  //       toast?.error(result?.message);
  //     }
  //   };

  return (
    <div className=" border border-white  shadow-2xl rounded-lg overflow-hidden">
      {/* main div  */}
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative"
      >
        {/* is hover div  */}
        {hoverOption && (
          <div className=" absolute top-0 flex items-center justify-center bg-gray-500  h-[50%] w-[100%]  opacity-70 rounded-b-full">
            <div className=" text-black flex items-center justify-center gap-3 my-auto">
              {/* details */}
              <Tooltip content="Details" color="secondary" placement="bottom">
                <TbListDetails
                  onClick={() => clickDetailsPage(item?.id as string)}
                  size={38}
                  className="text-black cursor-pointer"
                />
              </Tooltip>

              {/* wishlist */}
              <Tooltip content="Wishlist" color="secondary" placement="bottom">
                <FaRegHeart size={38} className="text-black cursor-pointer" />
              </Tooltip>

              {/* add to cart */}
              <Tooltip
                content="Add To Cart"
                color="secondary"
                placement="bottom"
              >
                <IoCartOutline
                  //   onClick={() => {
                  //     if (item?.availability === availableProduct.STOCKOUT) {
                  //       toast.error("This Product Stock Out 😢");
                  //     } else {
                  //       handleAddToCartButton({
                  //         _id: item?._id,
                  //         image: item?.image?.[0],
                  //         buyQuantity: 1,
                  //         name: item?.name,
                  //         price: discountPrice(item?.price, item?.discount),
                  //         quantity: item?.quantity,
                  //       });
                  //     }
                  //     updateAddToCart(addToCartAction({}));
                  //   }}
                  size={38}
                  className="text-black cursor-pointer"
                />
              </Tooltip>
            </div>
          </div>
        )}

        {/* discount */}
        {item?.discount !== undefined && item?.discount > 0 && (
          <div className="absolute bg-secondary text-white top-5 py-1 px-2 text-sm rounded-r-full">
            <p>Save: {item?.discount}৳</p>
          </div>
        )}
        <br />
        <br />
        {/* img div */}
        <div className="flex justify-center items-center p-2 hover:cursor-pointer">
          <Image
            height={128}
            width={200}
            className="object-cover rounded-md"
            src={item?.images?.[0] as string}
            alt="Product image"
          />
        </div>

        {/* description div */}
        <div className="px-3 text-sm">
          <span>
            <span className="font-bold">Name</span>:{" "}
            {item?.productName?.slice(0, 30)}
          </span>

          <div className="flex justify-between items-center my-3">
            <p>
              <span className="font-bold text-sm">Available:</span>
              {item?.isAvailable === true && (
                <span className="text-secondary text-sm"> In Stock</span>
              )}

              {item?.isAvailable !== true && (
                <span className="text-red-600 text-sm"> Stock-Out</span>
              )}
            </p>
            <p>
              <span className="font-bold">Orders:</span> {item?.totalBuy}{" "}
            </p>
          </div>

          <p
            onClick={() => clickDetailsPage(item?.id as string)}
            className="font-light mt-3 hover:underline hover:text-primary hover:cursor-pointer"
            dangerouslySetInnerHTML={{
              __html: item?.description?.slice(0, 50)
            }}
          >
            
          </p>
        </div>

        {/* price div */}
        <div className="my-3 p-3 flex items-center gap-2">
          {/* real price */}
          <p className="font-bold text-2xl text-primary">
            {" "}
            {discountPrice(item?.price, item?.discount)}৳
          </p>
          {item?.discount && (
            <p className="text-gray-500 line-through">
              {item?.price as number}৳
            </p>
          )}
        </div>
      </div>

      {/* buy button div */}
      {showBuyButton && (
        <div className="p-3">
          {/* <Button item={item as TProduct} name="Buy Now" /> */}
        </div>
      )}
    </div>
  );
};

export default ProductCard;
