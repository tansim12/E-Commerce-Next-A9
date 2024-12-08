import React from "react";
import SuccessPaymentButton from "../Components/ui/Payment/SuccessPaymentButton";

const CPaymentCancelPage: React.FC = () => {

  return (
    <div className="flex justify-center items-center h-screen  px-4">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
        <h3 className="text-2xl font-semibold text-red-500 mb-4">
          Payment Canceled
        </h3>
        <p className="text-gray-600 mb-6">
          It seems that you canceled the payment. You can retry or go back to
          the homepage.
        </p>
        <SuccessPaymentButton />
      </div>
    </div>
  );
};

export default CPaymentCancelPage;
