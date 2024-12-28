// import CRegisterPage from "@/src/AllPages/CRegisterPage";
import dynamic from "next/dynamic";
const CRegisterPage = dynamic(() => import("@/src/AllPages/CRegisterPage"), { ssr: false });


const RegisterPage = () => {
  return (
    <div className="">
      <CRegisterPage />
    </div>
  );
};

export default RegisterPage;
