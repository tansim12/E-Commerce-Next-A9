"use client";
import React, { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { getAddToCartData } from "../utils/getLCData";
import { handleRemoveFromCart } from "../utils/addToCartFn";
import { usePublicPromoCheck } from "../hooks/product.hook";
import { AiOutlineArrowRight } from "react-icons/ai";
import toast from "react-hot-toast";
import { useAdditional } from "../Context/aditional.context";
import emptyPhoto from "../assets/empty-cart.png";
import Image from "next/image";

const CCartPage = () => {
  const [cartData, setCartData] = useState<any[]>([]);
  const [removeItem, setRemoveItem] = useState<any>(false);
  const [promoValue, setPromoValue] = useState({});
  const [discount, setDiscount] = useState<number>(0); // Store the discount
  const { setIsLoadingAdditional } = useAdditional();

  // Load cart data from localStorage
  useEffect(() => {
    const data = getAddToCartData();
    setCartData(data || []);
  }, [removeItem]);

  const { mutate: handleCheckPromoCheck, data } = usePublicPromoCheck();

  // Handle quantity changes
  const handleQuantityChange = (id: string, newQuantity: number) => {
    setCartData((prevCartData) =>
      prevCartData.map((item) =>
        item.id === id
          ? {
              ...item,
              buyQuantity: Math.min(Math.max(newQuantity, 1), item.quantity), // Clamp between 1 and available quantity
            }
          : item
      )
    );
  };

  // Calculate total price with possible discount
  const calculateTotal = () => {
    return cartData.reduce(
      (total, item) => total + item.price * item.buyQuantity,
      0
    );
  };

  // Handle promo code submission
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoValue) return toast.error("Please enter a promo code");
    const payload = {
      payload: { ...promoValue },
    };
    handleCheckPromoCheck(payload);
  };

  useEffect(() => {
    if (data?.status === 200) {
      toast.success(data?.message);
      // Check for valid ID and update the price of the matching item
      const updatedCartData = cartData.map((item) =>
        item.id === data.id
          ? { ...item, price: data.newUnitPrice } // Update the price with the new unit price
          : item
      );
      setCartData(updatedCartData); // Set the updated cart data
    }
    if (data?.status === 400) {
      toast.error(data?.message);
    }
  }, [data]);

  console.log(data);

  // Apply discount to the total price
  const discountedTotal = () => {
    const total = calculateTotal();
    return total - (total * discount) / 100;
  };

  if (!cartData.length) {
    return (
      <div className="p-6 text-center">
        <Image
          width={300}
          height={300}
          src={emptyPhoto}
          alt="Cart is empty"
          className="mx-auto"
        />
        <p>Your cart is empty.</p>
      </div>
    );
  }

  return (
    <>
      <div className="p-6">
        <div className="mx-auto border-primary border shadow-md rounded-lg overflow-hidden">
          <div className="p-6 border-b">
            <h1 className="text-2xl font-bold">Shopping Cart</h1>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="text-sm md:text-[16px]">
                  <th className="p-4 text-left">Image</th>
                  <th className="p-4 text-left">Product Name</th>
                  <th className="p-4 text-left">Shop Name</th>
                  <th className="p-4 text-left">Quantity</th>
                  <th className="p-4 text-left">Actions</th>
                  <th className="p-4 text-left">Unit Price</th>
                  <th className="p-4 text-left">Total</th>
                </tr>
              </thead>
              <tbody>
                {cartData.map((item) => (
                  <tr key={item.id} className="border-t">
                    <td className="p-4">
                      <img
                        src={item?.image}
                        alt={item?.productName}
                        className="w-16 h-16 object-cover rounded"
                      />
                    </td>
                    <td className="p-4">{item?.productName}</td>
                    <td className="p-4">{item?.shopName}</td>
                    <td className="p-1">
                      <input
                        required={true}
                        onChange={(e) =>
                          setPromoValue({
                            id: item.id,
                            shopId: item?.shopId,
                            promo: e.target.value,
                          })
                        }
                        className="w-24 h-10 border border-gray-300 rounded px-2"
                        type="text"
                      />
                      <button onClick={onSubmit} type="submit">
                        <AiOutlineArrowRight size={20} />
                      </button>
                    </td>
                    <td className="p-4">
                      <input
                        type="number"
                        min="1"
                        value={item?.buyQuantity}
                        onChange={(e) =>
                          handleQuantityChange(
                            item?.id,
                            parseInt(e?.target?.value) || 1
                          )
                        }
                        className="w-16 border border-gray-300 rounded px-2"
                      />
                      <p className="text-sm text-gray-500">
                        Max: {item?.quantity}
                      </p>
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => {
                          handleRemoveFromCart(item?.id);
                          setIsLoadingAdditional((pre: any) => !pre);
                          setRemoveItem((pre: any) => !pre);
                        }}
                        className="text-red-500 hover:text-red-700"
                        title="Remove Item"
                      >
                        <RxCross1 />
                      </button>
                    </td>
                    <td className="p-4">{item?.price.toLocaleString()}৳</td>
                    <td className="p-4 font-bold text-red-600">
                      {(item?.price * item?.buyQuantity).toLocaleString()}৳
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-6 border-t">
            <div className="flex justify-between items-center">
              <p className="text-xl font-bold">Sub-Total:</p>
              <p className="text-xl font-bold text-red-600">
                {calculateTotal().toLocaleString()}৳
              </p>
            </div>
            <div className="flex justify-between items-center mt-2">
              <p className="text-xl font-bold">Total:</p>
              <p className="text-xl font-bold text-red-600">
                {discountedTotal().toLocaleString()}৳
              </p>
            </div>
          </div>

          <div className="p-6 border-t flex justify-end">
            <button className="bg-green-500 text-white px-6 py-2 rounded">
              Confirm Order
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CCartPage;
