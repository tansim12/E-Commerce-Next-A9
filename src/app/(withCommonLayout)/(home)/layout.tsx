
import { childrenProps } from "@/src/Types";
import React from "react";

const HomeLayout = ({ children }: childrenProps) => {
  return (
    <div>
      {children}
    </div>
  );
};

export default HomeLayout;
