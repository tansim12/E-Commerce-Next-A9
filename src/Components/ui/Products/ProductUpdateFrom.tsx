"use client";
import React, { useEffect, useState } from "react";
import FXForm from "../../Form/FXForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import CustomInput from "../../Form/CustomInput";
import CustomReactQuill from "../../Form/CustomReactQuill";
import CustomSelect from "../../Form/CustomSelect";

import CustomToggle from "../../Form/CustomToggle";

import CustomFileUpload from "../../Form/CustomFileUpload";
import { uploadImagesToImgBB } from "@/src/utils/uploadImagesToImgBB";
import { zodResolver } from "@hookform/resolvers/zod";
import { parseDate } from "@internationalized/date";
import toast from "react-hot-toast";
import Loading from "../Loading/Loading";
import CustomButton from "../Button/CustomButton";

import { useRouter } from "next/navigation";
import {
  useCategoryBaseSubCategoryFind,
  useExistAllCategory,
} from "@/src/hooks/categoryAndSubCategory.hook";
import CustomSelectWithWatch from "../../Form/CustomSelectWithWatch";
import CustomRangePicker from "../../Form/CustomRangePicker";
import { useUpdateProduct } from "@/src/hooks/product.hook";
import { productSchema } from "@/src/Schemas/product.schema";
import { getDateRange } from "@/src/utils/getDateRange";
import moment from "moment";
import Image from "next/image";
const ProductUpdateFrom = ({
  defaultValue,
  onClose,
}: {
  onClose: any;
  defaultValue?: any;
}) => {
  const { allImages, id, ...mDefaultValue } = defaultValue;
  const [onChangeValue, setOnChangeValue] = useState<any>();
  const [getCategoryId, setGetCategoryId] = useState(null);
  const { data: existAllCategoryData } = useExistAllCategory();
  const categoryOptions = existAllCategoryData?.map((item: any) => ({
    label: item?.categoryName,
    value: item?.id,
  }));

  const router = useRouter();
  const {
    mutate: handleUpdateProduct,
    isPending,
    isSuccess,
    isError,
  } = useUpdateProduct();

  const [selectImages, setSelectImages] = useState([]);
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const { offerDateRange, ...newData } = data;
    const images = await uploadImagesToImgBB(selectImages);
    const payload = {
      productId: id,
      payload: {
        ...newData,
        images: images?.length > 0 ? images : allImages,
        flashSaleStartDate: onChangeValue?.start
          ? getDateRange(onChangeValue as any)?.startDateISO
          : defaultValue?.flashSaleStartDate,
        flashSaleEndDate: onChangeValue?.end
          ? getDateRange(onChangeValue as any)?.endDateISO
          : defaultValue?.flashSaleEndDate,
      },
    };
    console.log(payload);

    handleUpdateProduct(payload as any);
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success("Product Update Successfully done");
      onClose();
    }
    if (isError) {
      toast?.error("Product Failed 😥");
    }
  }, [isSuccess, isError]);

  //   sub category
  const { data: subCategoryData } =
    useCategoryBaseSubCategoryFind(getCategoryId);

  const subCategoryOptions = subCategoryData?.map((item: any) => ({
    label: item?.categoryName,
    value: item?.id,
  }));
  return (
    <>
      {isPending && <Loading />}

      <div className="my-10">
        <FXForm
          onSubmit={onSubmit}
          resolver={zodResolver(productSchema.updateProductValidationSchema)}
          defaultValues={mDefaultValue}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <CustomInput
              name="productName"
              label="Product Name *"
              type="text"
            />
            <CustomInput name="price" label="Price *" type="number" />
            <CustomInput name="quantity" label="Quantity *" type="number" />

            {/* discount  */}
            <CustomToggle label="Is Active Promo" name="isActivePromo" />
            <CustomInput name="discount" label="Discount" type="number" />
            <CustomInput name="promo" label="Promo" type="text" />

            {/* flash sale */}
            <CustomToggle label="Is Flash Sale Offer" name="isFlashSaleOffer" />
            <CustomInput
              name="flashSaleDiscount"
              label="FlashSale Discount"
              type="number"
            />
            <CustomRangePicker
              name="offerDateRange"
              label="Offer Date Range"
              defaultValue={{
                start: parseDate(
                  moment(defaultValue?.flashSaleStartDate).format("YYYY-MM-DD")
                ),
                end: parseDate(
                  moment(defaultValue?.flashSaleEndDate).format("YYYY-MM-DD")
                ),
              }}
              changeOnValue={setOnChangeValue}
            />
          </div>

          <div className=" flex gap-10 w-full items-center my-3">
            <div className="basis-3/5">
              <CustomSelectWithWatch
                changeOnValue={setGetCategoryId}
                label="Category *"
                name="categoryId"
                options={categoryOptions}
                defaultValue={[defaultValue?.categoryId]}
                placeholder="Select Category"
              />
            </div>
            <div className="basis-3/5">
              <CustomSelect
                label="Sub Category"
                name="subCategoryId"
                options={subCategoryOptions}
                defaultValue={[defaultValue?.subCategoryId]} // Pass the value, not the label
                placeholder="Select Sub Category"
              />
            </div>

            <div className="basis-2/5 ">
              <CustomToggle label="Is Delete" name="isDelete" />
            </div>
          </div>
            <CustomToggle label="Is Available" name="isAvailable" />
          <div className="mb-16">
            {/* @ts-ignore */}
            <CustomReactQuill name="description" label="Description *" />
          </div>

          <div className=" flex flex-wrap gap-3 my-5">
            {allImages?.map((img: string, i: number) => (
              <Image
                key={i} // Add a key for each item in the list
                width={80}
                height={80}
                alt={`Image ${i + 1}`} // Provide a meaningful alt text
                src={img} // Ensure `img` is a valid URL
              />
            ))}
          </div>

          <CustomFileUpload
            changeOnValue={setSelectImages}
            name="images"
            label="Images *"
          />

          <CustomButton name="Submit" customCss="w-full" />
        </FXForm>
      </div>
    </>
  );
};

export default ProductUpdateFrom;
