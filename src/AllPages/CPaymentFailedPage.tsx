
import React from "react";

import { FaExclamationCircle } from "react-icons/fa"; // Importing an icon for failure
import SuccessPaymentButton from "../Components/ui/Payment/SuccessPaymentButton";
const CPaymentFailedPage: React.FC = () => {

  return (
    <div className="flex flex-col justify-center items-center h-screen  px-4">
      <div className="bg-white shadow-lg rounded-lg p-6 text-center max-w-md w-full">
        <FaExclamationCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Payment Failed
        </h2>
        <p className="text-gray-600 mb-6">
          It seems that you failed the payment. You can retry or go back to the
          homepage.
        </p>
        <SuccessPaymentButton />
      </div>
    </div>
  );
};

export default CPaymentFailedPage;
