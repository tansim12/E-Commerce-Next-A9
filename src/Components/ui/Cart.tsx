"use client";

import { useAdditional } from "@/src/Context/aditional.context";
import { useRouter } from "next/navigation";
import React from "react";
import { BsCart2 } from "react-icons/bs";

const Cart = () => {
  const route = useRouter();
  const { totalCartProducts } = useAdditional();

  return (
    <div
      onClick={() => {
        route.push("/cart");
      }}
      className="relative"
    >
      {totalCartProducts > 0 && (
        <span className="rounded-full size-5 text-center text-sm top-0 right-0 bg-red-500 absolute">
          {totalCartProducts}
        </span>
      )}
      <BsCart2 size={32} />
    </div>
  );
};

export default Cart;
