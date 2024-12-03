import { Navbar } from "@/src/Components/ui/Navbar";
import { childrenProps } from "@/src/Types";
import React from "react";

const HomeLayout = ({ children }: childrenProps) => {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      {children}
    </div>
  );
};

export default HomeLayout;
