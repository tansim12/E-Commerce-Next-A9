import React from "react";

const CCartPage = () => {
  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto border-primary border shadow-md rounded-lg overflow-hidden">
        <div className="p-6 border-b">
          <h1 className="text-2xl font-bold">Shopping Cart</h1>
        </div>
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="p-4 text-left">Image</th>
              <th className="p-4 text-left">Product Name</th>
              <th className="p-4 text-left">Model</th>
              <th className="p-4 text-left">Quantity</th>
              <th className="p-4 text-left">Unit Price</th>
              <th className="p-4 text-left">Total</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="p-4">
                <img
                  src="/placeholder-laptop.jpg"
                  alt="Laptop"
                  className="w-16 h-16 object-cover rounded"
                />
              </td>
              <td className="p-4">Lenovo IdeaPad Slim 3</td>
              <td className="p-4">IdeaPad Slim 3 14ABR8</td>
              <td className="p-4">
                <input
                  type="number"
                  min="1"
                  defaultValue="1"
                  className="w-16 border border-gray-300 rounded px-2"
                />
              </td>
              <td className="p-4">70,000৳</td>
              <td className="p-4 font-bold text-red-600">70,000৳</td>
              <td className="p-4">
                <button
                  className="text-red-500 hover:text-red-700"
                  title="Remove Item"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="p-6 border-t">
          <div className="flex justify-between items-center">
            <p className="text-xl font-bold">Sub-Total:</p>
            <p className="text-xl font-bold text-red-600">70,000৳</p>
          </div>
          <div className="flex justify-between items-center mt-2">
            <p className="text-xl font-bold">Total:</p>
            <p className="text-xl font-bold text-red-600">70,000৳</p>
          </div>
        </div>
        <div className="p-6 border-t">
          <p className="mb-4">What would you like to do next?</p>
          <div className="flex flex-wrap gap-4">
            <input
              type="text"
              placeholder="Promo / Coupon Code"
              className="flex-1 border border-gray-300 rounded px-4 py-2"
            />
            <button className="bg-blue-600 text-white px-4 py-2 rounded">
              Apply Coupon
            </button>
            <input
              type="text"
              placeholder="Gift Voucher Code"
              className="flex-1 border border-gray-300 rounded px-4 py-2"
            />
            <button className="bg-purple-600 text-white px-4 py-2 rounded">
              Apply Voucher
            </button>
          </div>
        </div>
        <div className="p-6 border-t flex justify-between">
          <button className="bg-blue-500 text-white px-6 py-2 rounded">
            Continue Shopping
          </button>
          <button className="bg-green-500 text-white px-6 py-2 rounded">
            Confirm Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default CCartPage;
