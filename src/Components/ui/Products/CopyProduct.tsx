"use client";

import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import FXForm from "../../Form/FXForm";
import CustomSelectWithWatch from "../../Form/CustomSelectWithWatch";
import {
  useVendorFindAllProducts,
  useVendorFindSingleProducts,
} from "@/src/hooks/product.hook";
import Loading from "../Loading/Loading";

const CopyProduct = ({ setCopyProduct }: { setCopyProduct: any }) => {
  const [selectProductId, setSelectProductId] = useState<string | null>(null);

  const handleSubmit: SubmitHandler<FieldValues> = (data) => {};

  const { data: allProduct } = useVendorFindAllProducts();
  const allProductOptions = allProduct?.map((item: any) => ({
    label: item?.productName,
    value: item?.id,
  }));

  const { data: singleProduct, isPending } =
    useVendorFindSingleProducts(selectProductId);
  useEffect(() => {
    const payload = {
      isAvailable: singleProduct?.isAvailable,
      productName: singleProduct?.productName,
      isFlashSaleOffer: singleProduct?.isFlashSaleOffer,
      flashSaleDiscount: singleProduct?.flashSaleDiscount,
      promo: singleProduct?.promo,
      discount: singleProduct?.discount,
      isActivePromo: singleProduct?.isActivePromo,
      quantity: singleProduct?.quantity,
      price: singleProduct?.price,
      categoryId: singleProduct?.categoryId,
      subCategoryId: singleProduct?.subCategoryId,
      description: singleProduct?.description,
      isDelete: singleProduct?.isDelete,
      allImages: singleProduct?.images,
      flashSaleStartDate: singleProduct?.flashSaleStartDate
        ? singleProduct?.flashSaleStartDate
        : new Date().toISOString(),
      flashSaleEndDate: singleProduct?.flashSaleEndDate
        ? singleProduct?.flashSaleEndDate
        : new Date().toISOString(),
    };
    setCopyProduct(payload);
  }, [singleProduct,selectProductId]);

  return (
    <>
      {isPending && <Loading />}
      <div className="w-96">
        <FXForm onSubmit={handleSubmit}>
          <CustomSelectWithWatch
            name="productId"
            label="Copy Product"
            changeOnValue={setSelectProductId}
            options={allProductOptions}
            placeholder="Select Product"
          />
        </FXForm>
      </div>
    </>
  );
};

export default CopyProduct;
