import { useAdditional } from "@/src/Context/aditional.context";
import { handleAddToCart } from "@/src/utils/addToCartFn";
import { discountPrice } from "@/src/utils/discountPrice";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const NewCustomButton = ({ name, item }: { name: any; item: any }) => {
  const navigate = useRouter();
  const { setIsLoadingAdditional } = useAdditional();
  const handleAddToCartButton = (data: any) => {
    console.log(data);

    const result = handleAddToCart(data);
    if (result?.status === true) {
      toast.success(result?.message);
      setIsLoadingAdditional((pre: any) => !pre);
      navigate.push("/cart");
    } else {
      toast?.error(result?.message);
    }
  };

  return (
    <div className="flex justify-center items-center mb-3">
      {item?.isAvailable !== false ? (
        <button
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
          disabled={item?.isAvailable !== true}
          className="group relative z-10 h-8 w-full overflow-hidden border-gray-500 bg-white text-xl text-black  font-bold  border-2 rounded-md hover:cursor-pointer"
        >
          <span className="absolute -inset-8 origin-left rotate-12 scale-x-0 transform bg-white transition-transform duration-700 group-hover:scale-x-50 group-hover:duration-300"></span>
          <span className="absolute -inset-[80px] origin-left rotate-12 scale-x-0 transform bg-sky-700 transition-transform duration-500 group-hover:scale-x-100 group-hover:duration-700"></span>
          <span className="absolute -inset-8 origin-left rotate-12 scale-x-0 transform bg-sky-900 transition-transform duration-300 group-hover:scale-x-50 group-hover:duration-500"></span>
          <span className="absolute z-10 text-center text-white opacity-0 duration-100 ease-out group-hover:opacity-100 group-hover:duration-700">
            {name}
          </span>
          {name}
        </button>
      ) : (
        <button
          disabled={item?.isAvailable !== true}
          className="group relative z-10 h-10 w-full overflow-hidden bg-gray-300 text-xl text-gray-600  font-bold  border-2 rounded-md"
        >
          {name}
        </button>
      )}
    </div>
  );
};

export default NewCustomButton;
