"use client"
import { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import CheckOutFrom from "../Components/ui/CheckOut/CheckOutFrom";

const CCheckoutPage = () => {
  const [cartItems, setCartItems] = useState<any>([]);


  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (cartItems.length > 0) {
        // Show a warning message
        event.preventDefault();
        event.returnValue = ""; // This is required for most browsers
      }
    };

    // Attach the event listener
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [cartItems]);

  return (
    <div className=" rounded-lg my-16">
      <div className="flex flex-col items-center border-b  py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
        <a href="#" className="text-2xl font-bold ">
          sneekpeeks
        </a>
        <div className="mt-4 py-2 text-xs sm:mt-0 sm:ml-auto sm:text-base">
          <div className="relative">
            <ul className="relative flex w-full items-center justify-between space-x-2 sm:space-x-4">
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <a
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700"
                  href="#"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </a>
                <span className="font-semibold text-gray-900">Shop</span>
              </li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <a
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white ring ring-gray-600 ring-offset-2"
                  href="#"
                >
                  2
                </a>
                <span className="font-semibold ">Shipping</span>
              </li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <a
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white"
                  href="#"
                >
                  3
                </a>
                <span className="font-semibold text-gray-500">Payment</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
        <div className="px-4 pt-8">
          <p className="text-xl font-medium">Order Summary</p>
          <p className="text-gray-400">
            Check your items. And select a suitable shipping method.
          </p>
          <div className="mt-8 space-y-3 rounded-lg border  px-2 py-4 sm:px-6">
            {/* showing buyingCart data  */}
            {cartItems?.length ? (
              cartItems?.map((item:any) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center my-4  border-b-2 p-2 relative "
                >
                  <button
                    // onClick={() => handleDeleteCartData(item?._id)}
                    className="absolute top-0 left-0"
                  >
                    <MdDeleteForever size={25} color="#2b2b2b" />
                  </button>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 object-contain"
                  />
                  <div className="flex-1 ml-4">
                    <p className="text-sm font-semibold">{item.name}</p>
                    <div className="text-gray-500">
                      {item.price}৳ × {item.buyQuantity} ={" "}
                      {item.price * item.buyQuantity}৳
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <button
                      // onClick={() => handleQuantityChange(item._id, 1)}
                      className="bg-green-600 text-white px-2 py-1 font-bold rounded-md"
                    >
                      +
                    </button>
                    <button
                      // onClick={() => handleQuantityChange(item._id, -1)}
                      className="bg-red-600 text-white px-2 py-1 font-bold rounded-md mt-1"
                    >
                      -
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <span className="flex justify-center items-center text-secondary">
                There Is No Data Available 😢
              </span>
            )}
          </div>

          <p className="mt-8 text-lg font-medium">Shipping Methods</p>
          <form className="mt-5 grid gap-6">
            <div className="relative">
              <input
                className="peer hidden"
                id="radio_1"
                type="radio"
                name="radio"
                checked
              />
              <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 "></span>
              <label className="peer-checked:border-2 peer-checked:border-gray-700  flex cursor-pointer select-none rounded-lg border border-gray-300 p-4">
                <img
                  className="w-14 object-contain"
                  src="/images/naorrAeygcJzX0SyNI4Y0.png"
                  alt=""
                />
                <div className="ml-5">
                  <span className="mt-2 font-semibold">Fedex Delivery</span>
                  <p className="text-slate-500 text-sm leading-6">
                    Delivery: 2-4 Days
                  </p>
                </div>
              </label>
            </div>
            <div className="relative">
              <input
                className="peer hidden"
                id="radio_2"
                type="radio"
                name="radio"
                checked
              />
              <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 "></span>
              <label className="peer-checked:border-2 peer-checked:border-gray-700  flex cursor-pointer select-none rounded-lg border border-gray-300 p-4">
                <img
                  className="w-14 object-contain"
                  src="/images/oG8xsl3xsOkwkMsrLGKM4.png"
                  alt=""
                />
                <div className="ml-5">
                  <span className="mt-2 font-semibold">Fedex Delivery</span>
                  <p className="text-slate-500 text-sm leading-6">
                    Delivery: 2-4 Days
                  </p>
                </div>
              </label>
            </div>
          </form>
        </div>
        <div className="mt-10 px-4 pt-8 lg:mt-0">
          <p className="text-xl font-medium">Payment Details</p>
          <p className="text-gray-400">
            Complete your order by providing your payment details.
          </p>

          {/* checkout form  */}
          <div className="mt-20">
            <CheckOutFrom
              newCartItem={[] as Partial<any>}
              totalPrice={200}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CCheckoutPage;
