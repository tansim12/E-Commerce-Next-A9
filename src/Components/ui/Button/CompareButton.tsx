"use client";
import { compareProductSaveLC } from "@/src/utils/compareSaveProductLC";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import { RiFileCopy2Fill } from "react-icons/ri";

const CompareButton = ({ item }: { item: any }) => {
  const router = useRouter();
  const handleClick = () => {
    const productSave = compareProductSaveLC(item?.id, item?.categoryId);
    console.log(productSave);
    if (productSave?.status === 200) {
      toast.success(productSave?.message);
      router.push("/compare");
    } else {
      toast.error(productSave);
    }
  };

  return (
    <div className="text-sm w-full flex justify-center items-center mb-2 border border-white rounded-xl p-1   cursor-pointer">
      <button
        onClick={handleClick}
        className="flex justify-center items-center gap-2"
      >
        <RiFileCopy2Fill /> Add To Compare
      </button>
    </div>
  );
};

export default CompareButton;
