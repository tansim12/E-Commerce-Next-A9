"use client";
import React, { useEffect, useState } from "react";
import FXForm from "../../Form/FXForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema } from "@/src/Schemas/product.schema";
import CustomInput from "../../Form/CustomInput";
import CustomToggle from "../../Form/CustomToggle";
import CustomRangePicker from "../../Form/CustomRangePicker";
import CustomSelectWithWatch from "../../Form/CustomSelectWithWatch";
import CustomSelect from "../../Form/CustomSelect";
import CustomFileUpload from "../../Form/CustomFileUpload";
import {
  useCategoryBaseSubCategoryFind,
  useExistAllCategory,
} from "@/src/hooks/categoryAndSubCategory.hook";
import { parseDate } from "@internationalized/date";
import { useRouter } from "next/navigation";
import { useCreateProduct, useUpdateProduct } from "@/src/hooks/product.hook";
import toast from "react-hot-toast";
import { getDateRange } from "@/src/utils/getDateRange";
import { uploadImagesToImgBB } from "@/src/utils/uploadImagesToImgBB";
import CustomButton from "../Button/CustomButton";
import Image from "next/image";
import moment from "moment";
import CustomReactQuill from "../../Form/CustomReactQuill";
import ComponentsLoading from "../Loading/ComponentsLoading";
import Loading from "../Loading/Loading";

const CopyProductForm = ({
  defaultValue,
  isCreate = true,
  shopExistStatus,
}: {
  defaultValue: any;
  isCreate?: boolean;
  shopExistStatus?: any;
}) => {
  const { allImages, ...mDefaultValue } = defaultValue;

  //   return

  const [onChangeValue, setOnChangeValue] = useState<any>();
  const [getCategoryId, setGetCategoryId] = useState(null);
  const { data: existAllCategoryData } = useExistAllCategory();
  const categoryOptions = existAllCategoryData?.map((item: any) => ({
    label: item?.categoryName,
    value: item?.id,
  }));

  const router = useRouter();
  const {
    mutate: handleCreateProduct,
    isPending,
    isSuccess,
    isError,
  } = useCreateProduct();

  const [selectImages, setSelectImages] = useState([]);
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const { offerDateRange, ...newData } = data;
    const images = await uploadImagesToImgBB(selectImages);
    const payload = {
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

    handleCreateProduct(payload as any);
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success("Product Create Successfully done");
      router.push("/vendor/manage-product/view-product");
    }
    if (isError) {
      toast?.error("Product create Failed 😥");
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
    <div>
      {isPending && <Loading />}
      <div className="my-10">
        <FXForm
          onSubmit={onSubmit}
          resolver={zodResolver(productSchema.createProductValidationSchema)}
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

          {(!isCreate && shopExistStatus === 200) ||
          (isCreate && shopExistStatus === 200) ? (
            <CustomButton name="Submit" customCss="w-full" />
          ) : (
            <span className="font-bold flex justify-center items-center text-red-600 text-xl">
              Please Shop Create First
            </span>
          )}
        </FXForm>
      </div>
    </div>
  );
};

export default CopyProductForm;
