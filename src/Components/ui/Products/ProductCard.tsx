import { useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { TbListDetails } from "react-icons/tb";
import toast from "react-hot-toast";
import { discountPrice } from "@/src/utils/discountPrice";
import Image from "next/image";
import { useRouter } from "next/navigation";
import NewCustomButton from "./NewCustomButton";
import { handleAddToCart } from "@/src/utils/addToCartFn";
import { useAdditional } from "@/src/Context/aditional.context";
import CompareButton from "../Button/CompareButton";

const ProductCard = ({
  showBuyButton,
  item,
  isFlashSale,
}: {
  showBuyButton?: any;
  item: any;
  isFlashSale?: boolean;
}) => {
  //   const updateAddToCart = useAppDispatch();
  const [hoverOption, setHoverOption] = useState(false);
  const router = useRouter();

  const handleMouseEnter = () => {
    setHoverOption(true);
  };

  const handleMouseLeave = () => {
    setHoverOption(false);
  };

  const clickDetailsPage = (id: string) => {
    router.push(`/product-details/${id}`);
  };
  const { setIsLoadingAdditional } = useAdditional();
  const handleAddToCartButton = (data: any) => {
    const result = handleAddToCart(data);
    if (result?.status === true) {
      toast.success(result?.message);
      setIsLoadingAdditional((pre: any) => !pre);
    } else {
      toast?.error(result?.message);
    }
  };

  return (
    <div className=" border border-white  shadow-2xl rounded-lg overflow-hidden relative">
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

              <TbListDetails
                onClick={() => clickDetailsPage(item?.id as string)}
                size={38}
                className="text-black cursor-pointer"
              />

              {/* wishlist */}

              <FaRegHeart size={38} className="text-black cursor-pointer" />

              {/* add to cart */}

              <IoCartOutline
                onClick={() => {
                  if (item?.isAvailable !== true) {
                    toast.error("This Product Stock Out 😢");
                  } else {
                    handleAddToCartButton({
                      id: item?.id,
                      shopName: item?.shop?.name,
                      image: item?.images?.[0],
                      buyQuantity: 1,
                      productName: item?.productName,
                      shopId: item?.shopId,
                      price: discountPrice(item?.price, item?.discount),
                      quantity: item?.quantity,
                    });
                  }
                }}
                size={38}
                className="text-black cursor-pointer"
              />
            </div>
          </div>
        )}

        {/* discount */}
        {item?.discount !== undefined && item?.discount > 0 && !isFlashSale && (
          <div className="absolute bg-secondary text-white top-5 py-1 px-2 text-sm rounded-r-full">
            <p>Save: {item?.discount}৳</p>
          </div>
        )}
        {isFlashSale && (
          <div className="absolute bg-primary text-white top-5 py-1 px-2 text-sm rounded-r-full">
            <p>Flash Offer: {item?.flashSaleDiscount}৳</p>
          </div>
        )}
        <br />
        <br />
        {/* img div */}

        <div className="flex justify-center items-center hover:cursor-pointer h-52 w-full overflow-hidden ">
          <Image
            height={128}
            width={250}
            className="object-cover md:rounded-md"
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
              __html: item?.description?.slice(0, 35),
            }}
          ></p>
        </div>

        {/* price div */}
        <div className="my-3 p-3 flex items-center gap-2">
          {/* real price */}
          <p className="font-bold text-2xl text-primary">
            {" "}
            {discountPrice(
              item?.price,
              isFlashSale ? item?.flashSaleDiscount : item?.discount
            )}
            ৳
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
        <div className="px-3 ">
          <NewCustomButton item={item} name="Buy Now" />
        </div>
      )}
      {showBuyButton && (
        <div className="px-3 ">
          <CompareButton item={item} />
        </div>
      )}
    </div>
  );
};

export default ProductCard;
