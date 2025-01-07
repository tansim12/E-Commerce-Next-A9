import dynamic from "next/dynamic";
import React from "react";
const CLoginPage = dynamic(() => import("@/src/AllPages/CLoginPage"), {
  ssr: false,
});

const LoginPage = () => {
  return (
    <div className=" ">
      <CLoginPage />
    </div>
  );
};

export default LoginPage;
