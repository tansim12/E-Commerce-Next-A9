"use client"
import { useRouter } from "next/navigation";
import React from "react";
import { BsCart2 } from "react-icons/bs";

const Cart = () => {
    const route = useRouter()
  return (
    <div onClick={()=>{
        route.push("/cart")
    }}>
      <BsCart2 size={32} />
    </div>
  );
};

export default Cart;
