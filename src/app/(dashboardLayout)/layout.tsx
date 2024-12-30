import DashboardNav from "@/src/Components/Shared/DashboardNav";
import DashboardSidebar from "@/src/Components/Shared/DashboardSidebar";
import { childrenProps } from "@/src/Types";
import React from "react";

const DashboardLayout = ({ children }: childrenProps) => {
  return (
    <div className=" mx-auto p-2 container px-2 sm:px-2">
      <div className="mb-3">
        <DashboardNav />
      </div>
      <hr />
      <div className=" flex flex-col lg:flex lg:flex-row gap-5 justify-center mt-8">
        <div className="w-[20%]  ">
          <DashboardSidebar />
        </div>
        <div className=" flex-1 lg:w-[80%]">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
