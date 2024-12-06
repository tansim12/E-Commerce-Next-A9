"use client";
import React, { useEffect } from "react";

import { FieldValues, SubmitHandler } from "react-hook-form";

import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";

import { useRouter } from "next/navigation";
import { useChangePassword } from "../hooks/auth.hook";
import Loading from "../Components/ui/Loading/Loading";
import FXForm from "../Components/Form/FXForm";
import CustomInput from "../Components/Form/CustomInput";
import CustomButton from "../Components/ui/Button/CustomButton";

const CForgetPasswordPage = ({ searchParams }: { searchParams: any }) => {
  const {
    isPending,
    mutate: handleChangePassword,
    isSuccess,
  } = useChangePassword();
  const router = useRouter();
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (data?.newPassword !== data?.confirmNewPassword) {
      return toast.error("New Password and Confirm New Password Not Matched");
    }
    const newPayload = {
      token: searchParams?.token,
      payload: {
        id: searchParams?.userId,
        password: data?.newPassword,
      },
    };
    handleChangePassword(newPayload);
  };

  useEffect(() => {
    if (isSuccess) {
      router.push("/login");
    }
  }, [isSuccess]);

  return (
    <>
      {isPending && <Loading />}
      <div className="h-screen w-full flex justify-center items-center ">
        <div className="border border-base p-5 md:p-16 rounded-xl w-[60%]">
          <div className="text-center text-lg md:text-2xl font-bold my-4">
            Forget Password
          </div>
          <FXForm
            onSubmit={onSubmit}
            // resolver={zodResolver(changePasswordValidationSchemaZod)}
          >
            
            <div>
              <CustomInput
                label="New Password"
                name="newPassword"
                type="password"
              />
            </div>
            <div>
              <CustomInput
                label="Confirm New Password"
                name="confirmNewPassword"
                type="password"
              />
            </div>
            <div className="my-3">
              <CustomButton name="Submit" />
            </div>
          </FXForm>
        </div>
      </div>
    </>
  );
};

export default CForgetPasswordPage;
