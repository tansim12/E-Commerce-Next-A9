
import React from 'react';
import { FaCheckCircle } from 'react-icons/fa'; // Import Check Circle icon from Font Awesome
import SuccessPaymentButton from '../Components/ui/Payment/SuccessPaymentButton';

const CPaymentSuccessPage: React.FC = () => {

 
  
  return (
    <div className="flex justify-center items-center h-screen  px-4">
      <div className="bg-white shadow-lg rounded-lg p-6 text-center max-w-md w-full">
        <FaCheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Payment Successful!</h2>
        <p className="text-gray-600 mb-6">
          Thank you for your purchase. Your payment was processed successfully.
        </p>
        <SuccessPaymentButton />
      </div>
    </div>
  );
};

export default CPaymentSuccessPage;
