// import { useAppDispatch } from "../../Redux/hook";
//

import { useRouter } from "next/navigation";

// import { buyingData } from "../../Redux/Features/Check Out/checkOut.slice";

const NewCustomButton = ({ name, item }: { name: any; item: any }) => {
  const navigate = useRouter();
  //   const updateBuyingData = useAppDispatch();
  // handleCheckOutPage
  //   const handleCheckOutPage = () => {
  //     updateBuyingData(
  //       buyingData([
  //         {
  //           _id: item?._id,
  //           name: item?.name,
  //           image: item?.image?.[0],
  //           quantity: item?.quantity,
  //           buyQuantity: 1,
  //           price: item?.price,
  //         },
  //       ])
  //     );
  //     navigate("/checkout");
  //   };

  return (
    <div className="flex justify-center items-center mb-3">
      {item?.isAvailable !== false ? (
        <button
          //   onClick={handleCheckOutPage}
          disabled={item?.isAvailable === true}
          className="group relative z-10 h-10 w-full overflow-hidden bg-white text-xl text-black  font-bold  border-2 rounded-md hover:cursor-pointer"
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
