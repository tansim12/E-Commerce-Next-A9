"use client";
import React, { useEffect } from "react";
import FXForm from "../../Form/FXForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import CustomInput from "../../Form/CustomInput";
import CustomToggle from "../../Form/CustomToggle";
import CustomButton from "../Button/CustomButton";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { useAdminUserProfileUpdate } from "@/src/hooks/user.hook";
import { useAdminCreateCategory } from "@/src/hooks/categoryAndSubCategory.hook";

const CategoryForm = ({
  defaultValue,
  isCreate = true,
  categoryId,
}: {
  defaultValue?: any;
  categoryId?: string;
  isCreate?: boolean;
}) => {
  const {
    mutate: handleCreateCategory,
    isPending,
    data: updatedUserData,
    isError,
    isSuccess,
  } = useAdminCreateCategory();

  useEffect(() => {
    if (isError) {
      toast.error("Category Create error");
    }

    if (isSuccess || updatedUserData) {
      toast.success("Category Create Successfully done");
      Swal.fire({
        title: "Create!",
        text: "Your file has been updated.",
        icon: "success",
      });
    }
  }, [isError, isSuccess, updatedUserData]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const newPayload = {
      payload: { ...data },
    };
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Update it!",
    }).then((result) => {
      if (result.isConfirmed) {
        handleCreateCategory(newPayload as any);
      }
    });
  };
  return (
    <div>
      <FXForm
        onSubmit={onSubmit}
        defaultValues={defaultValue ? defaultValue : ""}
      >
        <div className="flex justify-between items-center gap-3">
          <div className="basis-1/2">
            <CustomInput
              name="categoryName"
              label="Category Name"
              type="string"
            />
          </div>
          {!isCreate && (
            <div className="basis-1/2">
              <CustomToggle label="User Delete" name="isDelete" />
            </div>
          )}
        </div>
        <CustomButton name="Submit" />
      </FXForm>
    </div>
  );
};

export default CategoryForm;
