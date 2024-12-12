"use client";

import { useAdminAndVendorReviewReplayPaymentByProduct } from "@/src/hooks/payment.hook";
import { Input } from "@nextui-org/input";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaArrowRight } from "react-icons/fa";
import ComponentsLoading from "../Loading/ComponentsLoading";

const AdminAndVendorUpdateRepliedForm = ({ info }: { info: any }) => {
  console.log(info);

  const {
    mutate: handleUpdate,
    isPending,
    isError,
    isSuccess,
  } = useAdminAndVendorReviewReplayPaymentByProduct();
  const [shopMessage, setShopMessage] = useState("");

  const handleSubmit = () => {
    if (shopMessage?.length <= 0) {
      return toast.error("Please send replay");
    }
    const payload = {
      payload: {
        ...info,
        shopMessage: shopMessage,
      },
    };
    handleUpdate(payload as any);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Replay done");
    }
    if (isError) {
      toast.error("Replay failed");
    }
  }, [isSuccess, isError]);
  return (
    <>
      {isPending && <ComponentsLoading />}
      <div className="flex justify-center items-center">
        <Input
          type="text"
          size="sm"
          onChange={(e: any) => setShopMessage(e.target.value)}
        />
        <button onClick={handleSubmit} className="bg-primary p-2 rounded-lg">
          <FaArrowRight />
        </button>
      </div>
    </>
  );
};

export default AdminAndVendorUpdateRepliedForm;
// {
//     "paymentId":"b52bb60d-5072-43c0-af7a-210c2fda7789",
//     "userId":"95b2f8f6-1c83-4d9a-9605-c997a8ec9b96",
//     "shopMessage":"shopmessage"
//  }
