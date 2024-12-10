"use client";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import React from "react";

const CompareNavigate = () => {
  const router = useRouter();
  return (
    <div className="flex justify-center items-center ">
      <p className="text-2xl">There is no product. Please added Product😥</p>
      <Button size="md" onClick={() => router.push("/products")}>
        Go to product
      </Button>
    </div>
  );
};

export default CompareNavigate;
