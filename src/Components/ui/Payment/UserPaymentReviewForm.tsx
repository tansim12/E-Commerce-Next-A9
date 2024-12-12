"use client";

import { FieldValues, SubmitHandler } from "react-hook-form";
import CustomInput from "../../Form/CustomInput";
import CustomSelect from "../../Form/CustomSelect";
import FXForm from "../../Form/FXForm";
import CustomButton from "../Button/CustomButton";
import { useUserCreateReviewPaymentByProducts } from "@/src/hooks/payment.hook";
import ComponentsLoading from "../Loading/ComponentsLoading";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateProductReviewSchema } from "@/src/Schemas/productByPaymentReview.schema";

const UserPaymentReviewForm = ({
  defaultValue,
  onClose,
}: {
  defaultValue: any;
  onClose: any;
}) => {
  const { review } = defaultValue;

  const {
    mutate: handleCreateReview,
    isPending,
    isSuccess,
    isError,
  } = useUserCreateReviewPaymentByProducts();
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const payload = {
      paymentId: defaultValue?.paymentId,
      payload: { userMessage: data?.userMessage, rating: Number(data?.rating) },
    };
    handleCreateReview(payload);
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success("Review Done");
      onClose()
    }
    if (isError) {
      toast.error("Some thing went wrong");
    }
  }, [isSuccess, isError]);
  console.log(review?.rating.toString());
  const raging = review?.rating.toString();

  return (
    <>
      {isPending && <ComponentsLoading />}
      <div>
        <FXForm
          onSubmit={onSubmit}
          resolver={zodResolver(CreateProductReviewSchema)}
          defaultValues={review?.userMessage ? review : ""}
        >
          <div className="flex gap-3  items-center mb-5">
            {defaultValue?.review?.userMessage && (
              <CustomInput
                name="shopMessage"
                label="Shop Replied"
                type="text"
              />
            )}
            <CustomInput name="userMessage" label="Message" type="text" />
            <CustomSelect
              name="rating"
              label="Raging"
              options={[
                { label: "1", value: "1" },
                { label: "2", value: "2" },
                { label: "3", value: "3" },
                { label: "4", value: "4" },
                { label: "5", value: "5" },
              ]}
              placeholder="Select Rating"
              defaultValue={[raging]}
            />
          </div>

          {!defaultValue?.review?.userMessage && <CustomButton name="Submit" />}
        </FXForm>
      </div>
    </>
  );
};

export default UserPaymentReviewForm;
