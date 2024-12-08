"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const SuccessPaymentButton = () => {
  const router = useRouter();
  useEffect(() => {
    const clearLc = () => {
      const cartData = localStorage.getItem("addToCart");
      if (cartData) {
        console.log("Retrieved Data:", JSON.parse(cartData));
        localStorage.removeItem("addToCart");
        console.log("Item removed from localStorage");
      } else {
        console.log("No data found in localStorage under 'addToCart'");
      }
    };

    clearLc();
  }, []); // Runs only on the client side

  const handleViewOrder = () => {
    // Logic to navigate to the user's order page
    router.push("/products"); // Change this path as needed
  };

  const handleContinueShopping = () => {
    router.push("/"); // Navigate to the shop page
  };

  return (
    <div className="flex justify-around">
      <button
        onClick={handleViewOrder}
        className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md"
      >
        Back Shop
      </button>
      <button
        onClick={handleContinueShopping}
        className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-md"
      >
        See payment history
      </button>
    </div>
  );
};

export default SuccessPaymentButton;
