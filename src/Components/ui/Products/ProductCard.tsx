import { useEffect, useState } from "react";
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
import { useCreateUserWishlist } from "@/src/hooks/user.hook";
import { useUser } from "@/src/Context/user.context";

const ProductCard = ({
  showBuyButton,
  item,
  isFlashSale,
}: {
  showBuyButton?: any;
  item: any;
  isFlashSale?: boolean;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();
  const { setIsLoadingAdditional } = useAdditional();
  const { user } = useUser();
  const { mutate, isSuccess } = useCreateUserWishlist();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Wishlist product added");
    }
  }, [isSuccess]);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const clickDetailsPage = (id: string) =>
    router.push(`/product-details/${id}`);

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
    <div
      className="bg-[#27272a] rounded-lg shadow-sm hover:shadow-md transition-all duration-300 "
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative">
        {/* Discount Badge */}
        {(item?.discount > 0 || isFlashSale) && (
          <div
            className={`absolute z-10 left-2 top-2 w-12 h-12 flex items-center justify-center rounded-full text-xs font-bold 
            ${item?.discount >= 400 || isFlashSale ? "bg-red-500" : "bg-primary"} text-white`}
          >
            <div className="text-center leading-tight">
              <span>
                {isFlashSale ? item?.flashSaleDiscount : item?.discount}৳
              </span>
              <br />
              <span className="text-[10px]">OFF</span>
            </div>
          </div>
        )}

        {/* Product Image with Hover Effects */}
        <div className="relative aspect-square overflow-hidden rounded-t-lg">
          <Image
            height={220}
            width={220}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            src={item?.images?.[0] as string}
            alt={item?.productName || "Product image"}
          />

          {/* Hover Overlay with Actions */}
          {isHovered && (
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex flex-col items-center justify-center gap-4 transition-opacity duration-200">
              <button
                onClick={() => clickDetailsPage(item?.id as string)}
                className="bg-white text-gray-800 px-6 py-2 rounded-full text-sm font-medium 
                  transform transition-transform duration-200 hover:scale-105 hover:bg-gray-100"
              >
                View Details
              </button>

              <div className="flex items-center gap-3">
                <IconButton
                  icon={<FaRegHeart size={18} />}
                  onClick={() => {
                    if (!user?.id) {
                      return router.push("/login");
                    } else {
                      mutate({ payload: { productId: item?.id } });
                    }
                  }}
                  label="Wishlist"
                />
                <IconButton
                  icon={<IoCartOutline size={18} />}
                  onClick={() => {
                    if (item?.isAvailable !== true) {
                      toast.error("This Product is Out of Stock 😢");
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
                  label="Add to Cart"
                />
              </div>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4 space-y-2">
          <h3 className="text-sm font-medium text-white line-clamp-2">
            {item?.productName?.slice(0, 30)}
          </h3>

          {/* Stock Status and Orders */}
          <div className="flex items-center justify-between">
            <span
              className={`text-xs font-medium ${
                item?.isAvailable ? "text-green-600" : "text-red-600"
              }`}
            >
              {item?.isAvailable ? "In Stock" : "Out of Stock"}
            </span>
            <span className="text-xs text-gray-200">
              Orders: {item?.totalBuy}
            </span>
          </div>

          {/* Price Section */}
          <div className="flex items-center gap-2 pt-1">
            <span className="text-xl font-bold text-primary">
              {discountPrice(
                item?.price,
                isFlashSale ? item?.flashSaleDiscount : item?.discount
              )}
              ৳
            </span>
            {item?.discount > 0 && (
              <span className="text-sm text-gray-500 line-through">
                {item?.price}৳
              </span>
            )}
          </div>

          {/* Buy and Compare Buttons */}
          {showBuyButton && (
            <div className="space-y-2 pt-2">
              <NewCustomButton item={item} name="Buy Now" />
              <CompareButton item={item} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const IconButton = ({
  icon,
  onClick,
  label,
}: {
  icon: any;
  onClick: any;
  label: any;
}) => (
  <button
    onClick={onClick}
    className="bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full transition-all duration-200 hover:scale-105"
    title={label}
  >
    {icon}
  </button>
);

export default ProductCard;
