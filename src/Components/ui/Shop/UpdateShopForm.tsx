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
import { useCreateShop, useVendorFindHisShop } from "@/src/hooks/shop.hook";
import { shopSchema } from "@/src/Schemas/shop.schema";
import { useUser } from "@/src/Context/user.context";

const UpdateShopForm = ({ defaultValue }: { defaultValue?: any }) => {
  const { user } = useUser();
  const router = useRouter();
  //   const {
  //     mutate: handleCreateShop,
  //     isPending,
  //     isSuccess,
  //     isError,
  //   } = useCreateShop();

  const [selectImages, setSelectImages] = useState([]);
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const images = await uploadImagesToImgBB(selectImages);

    const payload = {
      vendorId: user?.id,
      name: data?.name,
      description: data?.description,
      contactNumber: data?.contactNumber,
      shopType: data?.shopType,
      address: data?.address,
      logo: images?.[0],
    };
    // handleCreateShop({ payload: payload as any });
  };
  //   useEffect(() => {
  //     if (isSuccess) {
  //       toast.success("Shop Create Successfully done");
  //       router.push("/vendor/dashboard");
  //     }
  //     if (isError) {
  //       toast?.error("Shop Create Failed 😥");
  //     }
  //   }, [isSuccess, isError]);

  return (
    <>
      {/* {isPending && <Loading />} */}

      <p className="text-center text-xl font-semibold mb-5 ">
        Update Shop Info
      </p>
      <div>
        <FXForm
          onSubmit={onSubmit}
          resolver={zodResolver(shopSchema.shopCreateSchema)}
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
            {defaultValue && (
              <div className="basis-2/5">
                <CustomToggle label="Is Delete" name="isDelete" />
              </div>
            )}
          </div>

          <div className="mb-16">
            {/* @ts-ignore */}
            <CustomReactQuill name="description" label="Description" />
          </div>

          <CustomFileUpload
            changeOnValue={setSelectImages}
            name="images"
            label="Images"
          />

          <Button type="submit">Submit</Button>
        </FXForm>
      </div>
    </>
  );
};

export default UpdateShopForm;
