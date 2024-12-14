"use client";

import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import FXForm from "../../Form/FXForm";
import CustomSelectWithWatch from "../../Form/CustomSelectWithWatch";
import {
  useVendorFindAllProducts,
  useVendorFindSingleProducts,
} from "@/src/hooks/product.hook";

const CopyProduct = ({ setCopyProduct }: { setCopyProduct: any }) => {
  const [selectProductId, setSelectProductId] = useState<string | null>(null);

  const handleSubmit: SubmitHandler<FieldValues> = (data) => {};

  const { data: allProduct } = useVendorFindAllProducts();
  const allProductOptions = allProduct?.map((item: any) => ({
    label: item?.productName,
    value: item?.id,
  }));

  const { data: singleProduct } = useVendorFindSingleProducts(selectProductId);

  useEffect(() => {
    const payload = {
      productName: singleProduct?.productName,
      quantity: singleProduct?.quantity,
    };
    setCopyProduct(payload);
  }, [singleProduct]);

  return (
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
  );
};

export default CopyProduct;
