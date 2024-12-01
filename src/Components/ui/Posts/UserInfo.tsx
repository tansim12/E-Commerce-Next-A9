"use client";
import { useForgetPassword } from "@/src/hooks/auth.hooks";
import { TUser } from "@/src/Types/User/user.types";
import moment from "moment";
import Loading from "../Loading/Loading";
import { useEffect } from "react";
import Swal from "sweetalert2";

const UserInfo = ({ loggedInUser }: { loggedInUser: Partial<TUser> }) => {
  const {
    mutate: handleRequestForgetPassword,
    isPending,
    isSuccess,
  } = useForgetPassword();

  const handleChangePassword = () => {
    const payload = {
      id: loggedInUser?._id,
    };
    handleRequestForgetPassword(payload as any);
  };

  useEffect(() => {
    if (isSuccess) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Please Check your Email",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  }, [isSuccess]);
  return (
    <div>
      {isPending && <Loading />}
      <div className=" shadow-lg rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">User Information</h2>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <span className="font-semibold">Name:</span>
            <span>{loggedInUser?.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Email:</span>
            <span>{loggedInUser?.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Role:</span>
            <span>{loggedInUser?.role}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Status:</span>
            <span className="text-green-500">{loggedInUser?.status}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Phone:</span>
            <span>{loggedInUser?.phone}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Verified:</span>
            <span className="text-green-500">
              {loggedInUser?.isVerified ? "Yes" : "No"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Account Created:</span>
            <span> {moment(loggedInUser?.createdAt).format("ll")}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Last Updated:</span>
            <span> {moment(loggedInUser?.updatedAt).format("ll")}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Last Password Change:</span>
            <span>
              {" "}
              {loggedInUser?.passwordChangeAt
                ? moment(loggedInUser?.passwordChangeAt).format("ll")
                : "N/A"}
            </span>
          </div>
        </div>

        {/* Password Buttons */}
        <div className="mt-6 flex justify-between gap-4">
          <button
            onClick={handleChangePassword}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Change Password
          </button>
          <button onClick={handleChangePassword} className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600">
            Forgot Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
