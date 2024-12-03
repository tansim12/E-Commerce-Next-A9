import { Navbar } from "@/src/Components/ui/Navbar";
import { childrenProps } from "@/src/Types";
import React from "react";

const CommonLayout = ({ children }: childrenProps) => {
  return (
    <div>
      <Navbar />
      <div className="mt-20">{children}</div>
    </div>
  );
};

export default CommonLayout;
