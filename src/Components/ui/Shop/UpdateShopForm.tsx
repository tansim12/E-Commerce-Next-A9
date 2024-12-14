"use client";
import React, { useEffect, useState } from "react";
import FXForm from "../../Form/FXForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import CustomInput from "../../Form/CustomInput";
import CustomReactQuill from "../../Form/CustomReactQuill";
import CustomToggle from "../../Form/CustomToggle";
import { Button } from "@nextui-org/react";
import CustomFileUpload from "../../Form/CustomFileUpload";
import { uploadImagesToImgBB } from "@/src/utils/uploadImagesToImgBB";
import { zodResolver } from "@hookform/resolvers/zod";

import toast from "react-hot-toast";
import Loading from "../Loading/Loading";

import { useRouter } from "next/navigation";
import { useUpdateShop } from "@/src/hooks/shop.hook";
import { shopSchema } from "@/src/Schemas/shop.schema";
import Image from "next/image";
import CustomButton from "../Button/CustomButton";

const UpdateShopForm = ({
  defaultValue,
  isAdminUpdate = false,
  onClose,
}: {
  isAdminUpdate?: boolean;
  defaultValue?: any;
  onClose?: any;
}) => {
  const router = useRouter();
  const {
    mutate: handleUpdateShop,
    isPending,
    isSuccess,
    isError,
  } = useUpdateShop();

  const [selectImages, setSelectImages] = useState([]);
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const images = await uploadImagesToImgBB(selectImages);

    const payload = {
      name: data?.name,
      isDelete: data?.isDelete,
      isBlocked: data?.isBlocked,
      description: data?.description,
      contactNumber: data?.contactNumber,
      shopType: data?.shopType,
      address: data?.address,
      logo: images?.[0] ? images?.[0] : defaultValue?.logo,
    };
    handleUpdateShop({ shopId: defaultValue?.id, payload: payload as any });
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success("Shop Update Successfully done");

      if (isAdminUpdate) {
        onClose();
      } else {
        router.push("/vendor/dashboard");
      }
    }
    if (isError) {
      toast?.error("Shop Create Failed 😥");
    }
  }, [isSuccess, isError]);

  return (
    <>
      {isPending && <Loading />}

      <p className="text-center text-xl font-semibold mb-5 ">
        Update Shop Info
      </p>
      <div>
        <FXForm
          onSubmit={onSubmit}
          resolver={zodResolver(shopSchema.shopUpdateSchema)}
          defaultValues={defaultValue}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <CustomInput name="name" label="Shop Name" type="text" />
            <CustomInput
              name="contactNumber"
              label="Contact Number"
              type="text"
            />
            <CustomInput name="address" label="Address" type="text" />
            <CustomInput name="shopType" label="Shop Type" type="text" />
          </div>

          <div className="mb-16">
            {/* @ts-ignore */}
            <CustomReactQuill name="description" label="Description" />
          </div>

          <div className="flex  items-center gap-3">
            {defaultValue && isAdminUpdate && (
              <div className="basis-2/5">
                <CustomToggle label="Is Delete" name="isDelete" />
                <CustomToggle label="Is Blocked" name="isBlocked" />
              </div>
            )}
            {defaultValue?.logo && (
              <div>
                <Image
                  src={defaultValue?.logo ? defaultValue?.logo : ""}
                  alt="logo"
                  height={150}
                  width={150}
                />
              </div>
            )}
          </div>

          <CustomFileUpload
            changeOnValue={setSelectImages}
            name="images"
            label="Images"
          />

          <CustomButton name="Submit" customCss="w-full" />
        </FXForm>
      </div>
    </>
  );
};

export default UpdateShopForm;
