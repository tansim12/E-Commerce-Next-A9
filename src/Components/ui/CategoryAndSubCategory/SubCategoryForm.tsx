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
  useAdminCreateSubCategory,
  useAdminUpdateCategory,
  useAdminUpdateSubCategory,
  useExistAllCategory,
} from "@/src/hooks/categoryAndSubCategory.hook";
import CustomSelect from "../../Form/CustomSelect";

const SubCategoryForm = ({
  defaultValue,
  isCreate = true,
}: {
  defaultValue?: any;
  isCreate?: boolean;
}) => {
  const { data: existAllCategoryData } = useExistAllCategory();
  const categoryData = existAllCategoryData?.map((item: any) => ({
    label: item?.categoryName,
    value: item?.id,
  }));

  const {
    mutate: handleCreateSubCategory,
    data: createSubCategoryData,
    isError: categorySubCreateError,
    isSuccess: categorySubCreateSuccess,
  } = useAdminCreateSubCategory();

  const {
    mutate: handleUpdateSubCategory,
    data: updatedSubCategoryData,
    isError: subcategoryUpdateError,
    isSuccess: subcategoryUpdateSuccess,
  } = useAdminUpdateSubCategory();

  useEffect(() => {
    // create
    if (categorySubCreateError) {
      toast.error("Category Create error");
    }

    if (categorySubCreateSuccess) {
      Swal.fire({
        title: "Create!",
        text: "Your file has been updated.",
        icon: "success",
      });
    }
  }, [categorySubCreateError, categorySubCreateSuccess, createSubCategoryData]);

  useEffect(() => {
    // update
    if (subcategoryUpdateError) {
      toast.error("Category Update error");
    }

    if (subcategoryUpdateSuccess || updatedSubCategoryData) {
      Swal.fire({
        title: "Updated!",
        text: "Your file has been updated.",
        icon: "success",
      });
    }
  }, [subcategoryUpdateSuccess, subcategoryUpdateError, updatedSubCategoryData]);

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
          handleCreateSubCategory(newPayload as any);
        }
        {
          handleUpdateSubCategory(updatePayload as any);
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
          {isCreate && (
            <div className="basis-1/2">
              <CustomSelect
                options={categoryData}
                placeholder="Select Category"
                label="Select Category"
                name="categoryId"
              />
            </div>
          )}
        </div>
        <CustomButton name="Submit" />
      </FXForm>
    </div>
  );
};

export default SubCategoryForm;
