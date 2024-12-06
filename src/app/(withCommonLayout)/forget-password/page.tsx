import CForgetPasswordPage from "@/src/AllPages/CForgetPassword";
import React from "react";

const ForgetPasswordPage = ({ searchParams }: { searchParams: any }) => {
  return (
    <div>
      <CForgetPasswordPage searchParams={searchParams} />
    </div>
  );
};

export default ForgetPasswordPage;
