import CForgetPasswordPage from "@/src/AllPages/CForgetPassword";
import React from "react";

const ForgetPasswordPage = ({ searchParams }: { searchParams: any }) => {
  return (
    <div className='container mx-auto px-2 sm:px-2'>
      <CForgetPasswordPage searchParams={searchParams} />
    </div>
  );
};

export default ForgetPasswordPage;
