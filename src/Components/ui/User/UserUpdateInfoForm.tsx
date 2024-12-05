"use client";
import React, { useEffect } from "react";
import FXForm from "../../Form/FXForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import CustomInput from "../../Form/CustomInput";
import CustomToggle from "../../Form/CustomToggle";
import CustomSelect from "../../Form/CustomSelect";
import CustomButton from "../Button/CustomButton";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { useAdminUserProfileUpdate } from "@/src/hooks/user.hook";

const UserUpdateInfoForm = ({
  defaultValue,
  userId,
}: {
  defaultValue: any;
  userId: string;
}) => {
  const {
    mutate: handleUserInfoUpdate,
    isPending,
    data: updatedUserData,
    isError,
    isSuccess,
  } = useAdminUserProfileUpdate();

  useEffect(() => {
    if (isError) {
      toast.error("User Info update error");
    }

    console.log(updatedUserData);
    
    if (isSuccess || updatedUserData) {
      toast.success("User Update Successfully done");
      Swal.fire({
        title: "Updated!",
        text: "Your file has been updated.",
        icon: "success",
      });
    }
  }, [isError, isSuccess, updatedUserData]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const newPayload = {
      userId,
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
        handleUserInfoUpdate(newPayload as any);
      }
    });
  };
  console.log(defaultValue);
  
  return (
    <div>
      <FXForm onSubmit={onSubmit} defaultValues={defaultValue}>
        <div className="flex justify-between items-center gap-3">
          <div className="basis-1/2">
            <CustomInput name="name" label="Name" type="string" />
          </div>
          <div className="basis-1/2">
            <CustomSelect
              options={[
                { label: "user", value: "user" },
                { label: "admin", value: "admin" },
                { label: "vendor", value: "vendor" },
              ]}
              defaultValue={[defaultValue?.role]}
              placeholder="Select Role"
              label="User Role"
              name="role"
            />
          </div>
        </div>

        <div className="flex justify-between items-center gap-5 my-5">
          <div>
            <CustomToggle label="User Delete" name="isDelete" />
          </div>
          
          <div>
            <div className="basis-1/2">
              <CustomSelect
                options={[
                  { label: "active", value: "active" },
                  { label: "blocked", value: "blocked" },
                ]}
                defaultValue={[defaultValue?.status]}
                placeholder="Select Status"
                label="User Status"
                name="status"
              />
            </div>
          </div>
          <div></div>
        </div>

        <CustomButton name="Submit" />
      </FXForm>
    </div>
  );
};

export default UserUpdateInfoForm;
