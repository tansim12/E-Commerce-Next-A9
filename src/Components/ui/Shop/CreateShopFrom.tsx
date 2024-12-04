"use client";
import React, { useEffect, useState } from "react";
import FXForm from "../../Form/FXForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import CustomInput from "../../Form/CustomInput";
import CustomReactQuill from "../../Form/CustomReactQuill";
import CustomSelect from "../../Form/CustomSelect";
import { categoryDataByLabel } from "@/src/Constant/filter.const";
import CustomToggle from "../../Form/CustomToggle";
import { Button } from "@nextui-org/react";
import { TUser } from "@/src/Types/User/user.types";
import CustomFileUpload from "../../Form/CustomFileUpload";
import { uploadImagesToImgBB } from "@/src/utils/uploadImagesToImgBB";
import { zodResolver } from "@hookform/resolvers/zod";

import toast from "react-hot-toast";
import Loading from "../Loading/Loading";
import CustomButton from "../Button/CustomButton";
import { MdWorkspacePremium } from "react-icons/md";
import { useRouter } from "next/navigation";
import { useExistAllCategory } from "@/src/hooks/categoryAndSubCategory.hook";
const CreateShopFrom = () => {
  const { data: existAllCategoryData } = useExistAllCategory();
  const categoryOptions = existAllCategoryData?.map((item: any) => ({
    label: item?.categoryName,
    value: item?.id,
  }));

  const router = useRouter();
  //   const {
  //     mutate: handleCreatePost,
  //     isPending,
  //     isSuccess,
  //     isError,
  //   } = useCreatePost();
  const [selectImages, setSelectImages] = useState([]);
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const images = await uploadImagesToImgBB(selectImages);

    const payload = {
      title: data?.title,
      description: data?.description,
      premium: data?.premium,
      images,
      category: data?.category,
    };

    // handleCreatePost(payload as any);
  };
  //   useEffect(() => {
  //     if (isSuccess) {
  //       onClose();
  //       toast.success("Post Create Successfully done");
  //     }
  //     if (isError) {
  //       toast?.error("Post Failed 😥");
  //     }
  //   }, [isSuccess, isError]);

  return (
    <>
      {/* {isPending && <Loading />} */}
      <div>
        <FXForm
          onSubmit={onSubmit}
          // resolver={zodResolver(createPostSchema)}
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

          <div className=" flex gap-10 w-full items-center my-3">
            <div className="basis-3/5">
              <CustomSelect
                label="Category"
                name="categoryId"
                options={categoryOptions}
                placeholder="Select Category"
              />
            </div>
            <div className="basis-2/5">
              <CustomToggle label="Is Delete" name="isDelete" />
            </div>
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

export default CreateShopFrom;
