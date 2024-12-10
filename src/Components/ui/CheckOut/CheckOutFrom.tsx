"use client";
import { useCreatePayment } from "@/src/hooks/payment.hook";
import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import toast from "react-hot-toast";
import ComponentsLoading from "../Loading/ComponentsLoading";

interface IUserInfo {
  email: string;
  cardHolder: string;
  cardNo?: string;
  expiry?: string;
  cvc?: string;
  billingAddress: string;
  state: string;
  zip: string;
}

const CheckOutFrom = ({ orderData }: { orderData: any }) => {
  const isLoading = false;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserInfo>();

  const {
    data: paymentData,
    mutate: handleCratePayment,
    isError,
    isPending,
  } = useCreatePayment();

  const onSubmit: SubmitHandler<IUserInfo> = async (data) => {
    const payload = {
      payload: orderData?.cartData,
    };
    handleCratePayment(payload);
  };

  
  useEffect(() => {
    if (isError) {
      toast.error("Payment Some thing went wrong, please new add to cart");
    }
    if (paymentData) {
      window.location.href = paymentData.url;
    }
  }, [isError, paymentData]);


  return (
    <div>
      {isPending && <ComponentsLoading />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="">
          <label className="mt-4 mb-2 block text-sm font-medium">Email</label>
          <div className="relative">
            <input
              type="text"
              id="email"
              className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
              placeholder="your.email@gmail.com"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
            <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
              </svg>
            </div>
          </div>

          {/* Other input fields similarly registered */}

          {/* Card Holder */}
          <label className="mt-4 mb-2 block text-sm font-medium">
            Card Holder
          </label>
          <div className="relative">
            <input
              type="text"
              id="cardHolder"
              className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
              placeholder="Your full name here"
              {...register("cardHolder", {
                required: "Card Holder name is required",
              })}
            />
            {errors.cardHolder && (
              <span className="text-red-500 text-sm">
                {errors.cardHolder.message}
              </span>
            )}
            <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"
                />
              </svg>
            </div>
          </div>

          {/* Billing Address */}
          <label className="mt-4 mb-2 block text-sm font-medium">
            Billing Address
          </label>
          <div className="flex flex-col sm:flex-row">
            <div className="relative flex-shrink-0 sm:w-7/12">
              <input
                type="text"
                id="billingAddress"
                className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Street Address"
                {...register("billingAddress", {
                  required: "Billing Address is required",
                })}
              />
              {errors.billingAddress && (
                <span className="text-red-500 text-sm">
                  {errors.billingAddress.message}
                </span>
              )}
              <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                <img
                  className="h-4 w-4 object-contain"
                  src="https://flagpack.xyz/_nuxt/4c829b6c0131de7162790d2f897a90fd.svg"
                  alt=""
                />
              </div>
            </div>

            <input
              type="text"
              id="state"
              className="flex-shrink-0 rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none sm:w-1/6 focus:z-10 focus:border-blue-500 focus:ring-blue-500"
              placeholder="State"
              {...register("state", { required: "State is required" })}
            />
            {errors.state && (
              <span className="text-red-500 text-sm">
                {errors.state.message}
              </span>
            )}
            <input
              type="text"
              id="zip"
              className="flex-shrink-0 rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none sm:w-1/6 focus:z-10 focus:border-blue-500 focus:ring-blue-500"
              placeholder="ZIP"
              {...register("zip", { required: "ZIP is required" })}
            />
            {errors.zip && (
              <span className="text-red-500 text-sm">{errors.zip.message}</span>
            )}
          </div>

          <div className="mt-6 border-t border-b py-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium ">Subtotal</p>
              <p className="font-semibold ">{orderData?.total} BDT</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium ">Tax</p>
              <p className="font-semibold ">00 BDT</p>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm font-medium ">Total</p>
            <p className="text-2xl font-semibold ">{orderData?.total} BDT</p>
          </div>

          <button
            disabled={orderData?.total <= 0 || isLoading}
            type="submit"
            className={`mt-4 mb-8 w-full ${
              isLoading
                ? "rounded-full flex justify-center items-center"
                : "rounded-md"
            } px-6 py-3 font-medium text-white ${
              orderData?.total <= 0 ? "bg-gray-400" : "bg-secondary"
            }`}
          >
            {isLoading ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
            ) : (
              "Place Order"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckOutFrom;
