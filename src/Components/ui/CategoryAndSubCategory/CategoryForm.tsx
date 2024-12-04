"use client";
import React, { useEffect } from "react";
import FXForm from "../../Form/FXForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import CustomInput from "../../Form/CustomInput";
import CustomToggle from "../../Form/CustomToggle";
import CustomButton from "../Button/CustomButton";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

import {
  useAdminCreateCategory,
  useAdminUpdateCategory,
} from "@/src/hooks/categoryAndSubCategory.hook";

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
    data: createCategoryData,
    isError: categoryCreateError,
    isSuccess: categoryCreateSuccess,
  } = useAdminCreateCategory();

  const {
    mutate: handleUpdateCategory,
    data: updatedCategoryData,
    isError: categoryUpdateError,
    isSuccess: categoryUpdateSuccess,
  } = useAdminUpdateCategory();

  useEffect(() => {
    // create
    if (categoryCreateError) {
      toast.error("Category Create error");
    }

    if (categoryCreateSuccess ) {
      Swal.fire({
        title: "Create!",
        text: "Your file has been updated.",
        icon: "success",
      });
    }
  }, [
    categoryCreateError,
    categoryCreateSuccess,
    createCategoryData,
  ]);


  useEffect(() => {
   
    // update
    if (categoryUpdateError) {
      toast.error("Category Update error");
    }

    if (categoryUpdateSuccess || updatedCategoryData) {
      
      Swal.fire({
        title: "Updated!",
        text: "Your file has been updated.",
        icon: "success",
      });
    }
  }, [
    
    categoryUpdateSuccess,
    categoryUpdateError,
    updatedCategoryData,
  ]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const newPayload = {
      payload: { ...data },
    };
    const updatePayload = {
      categoryId: data?.categoryId,
      payload: {
        categoryName: data?.categoryName,
        isDelete: data?.isDelete,
      },
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
        if (isCreate) {
          handleCreateCategory(newPayload as any);
        }
        {
          handleUpdateCategory(updatePayload as any);
        }
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
