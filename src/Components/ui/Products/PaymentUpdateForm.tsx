"use client";
import React, { useEffect } from "react";
import FXForm from "../../Form/FXForm";
import { FieldValues, SubmitHandler } from "react-hook-form";

import CustomSelect from "../../Form/CustomSelect";
import CustomButton from "../Button/CustomButton";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { useAdminUserProfileUpdate } from "@/src/hooks/user.hook";
import { useUpdatePayment } from "@/src/hooks/payment.hook";

const PaymentUpdateForm = ({ defaultValue }: { defaultValue: any }) => {
  const {
    mutate: handleUserInfoUpdate,
    isPending,
    data: updatedUserData,
    isError,
    isSuccess,
  } = useUpdatePayment();

  useEffect(() => {
    if (isError) {
      toast.error("User Info update error");
    }

    console.log(updatedUserData);

    if (isSuccess || updatedUserData) {
      toast.success("User Update Successfully done");
      Swal.fire({
        title: "Updated!",
        text: "Your file has been updated.",
        icon: "success",
      });
    }
  }, [isError, isSuccess, updatedUserData]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const newPayload = {
      paymentId: data?.id,
      payload: { paymentStatus: data?.paymentStatus },
    };
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Update it!",
    }).then((result) => {
      if (result.isConfirmed) {
        handleUserInfoUpdate(newPayload as any);
      }
    });
  };
  console.log(defaultValue);

  return (
    <div>
      <FXForm onSubmit={onSubmit} defaultValues={defaultValue}>
        <div className="flex justify-between items-center gap-3">
          <div className="basis-1/2">
            <CustomSelect
              options={[
                { label: "cancel", value: "cancel" },
                { label: "confirm", value: "confirm" },
              ]}
              defaultValue={[defaultValue?.paymentStatus]}
              placeholder="Select PaymentStatus"
              label="User Role"
              name="paymentStatus"
            />
          </div>
        </div>

        <CustomButton name="Submit" />
      </FXForm>
    </div>
  );
};

export default PaymentUpdateForm;
