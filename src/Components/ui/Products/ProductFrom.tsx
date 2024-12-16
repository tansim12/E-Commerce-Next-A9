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
import { useCreateProduct } from "@/src/hooks/product.hook";
import { productSchema } from "@/src/Schemas/product.schema";
import { getDateRange } from "@/src/utils/getDateRange";
import CopyProduct from "./CopyProduct";
import CopyProductForm from "./CopyProductForm";
// import CopyProduct from "./CopyProduct";
const ProductFrom = ({
  isCreate = true,
  shopExistStatus,
}: {
  isCreate?: boolean;
  shopExistStatus?: any;
}) => {
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
    if (images?.length < 1) {
      return toast.error("Please Select image");
    }
    const payload = {
      payload: {
        ...newData,
        images,
        flashSaleStartDate: onChangeValue?.start
          ? getDateRange(onChangeValue as any)?.startDateISO
          : null,
        flashSaleEndDate: onChangeValue?.end
          ? getDateRange(onChangeValue as any)?.endDateISO
          : null,
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
      toast?.error("Post Failed 😥");
    }
  }, [isSuccess, isError]);

  //   sub category
  const { data: subCategoryData } =
    useCategoryBaseSubCategoryFind(getCategoryId);

  const subCategoryOptions = subCategoryData?.map((item: any) => ({
    label: item?.categoryName,
    value: item?.id,
  }));

  const [copyProduct, setCopyProduct] = useState<any>({});

  return (
    <>
      {isPending && <Loading />}
      <p className="text-center text-2xl font-semibold mb-5 ">
        Create Products
      </p>
      <div className="flex justify-end items-center ">
        <CopyProduct setCopyProduct={setCopyProduct} />
      </div>

      {copyProduct?.productName ? (
        <CopyProductForm
          defaultValue={copyProduct}
          isCreate={true}
          shopExistStatus={shopExistStatus}
        />
      ) : (
        <div className="my-10">
          <FXForm
            onSubmit={onSubmit}
            resolver={zodResolver(productSchema.createProductValidationSchema)}
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
              <CustomToggle
                label="Is Flash Sale Offer"
                name="isFlashSaleOffer"
              />
              <CustomInput
                name="flashSaleDiscount"
                label="FlashSale Discount"
                type="number"
              />
              <CustomRangePicker
                name="offerDateRange"
                label="Offer Date Range"
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
                  placeholder="Select Category"
                />
              </div>
              <div className="basis-3/5">
                <CustomSelect
                  label="Sub Category"
                  name="subCategoryId"
                  options={subCategoryOptions}
                  placeholder="Select Sub Category"
                />
              </div>
              {!isCreate && (
                <div className="basis-2/5">
                  <CustomToggle label="Is Delete" name="isDelete" />
                </div>
              )}
            </div>
            <div className="mb-16">
              {/* @ts-ignore */}
              <CustomReactQuill name="description" label="Description *" />
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
      )}
    </>
  );
};

export default ProductFrom;
