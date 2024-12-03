import DashboardNav from "@/src/Components/Shared/DashboardNav";
import DashboardSidebar from "@/src/Components/Shared/DashboardSidebar";
import { childrenProps } from "@/src/Types";
import React from "react";

const DashboardLayout = ({ children }: childrenProps) => {
  return (
    <div className="container mx-auto p-2">
      <div className="mb-3">
        <DashboardNav />
      </div>
      <hr />
      <div className=" flex flex-col lg:flex lg:flex-row gap-5 justify-center mt-8">
        <div className="basis-2/12">
          <DashboardSidebar />
        </div>
        <div className="basis-10/12 ">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
