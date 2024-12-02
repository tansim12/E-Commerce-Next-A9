import { childrenProps } from "@/src/Types";
import React from "react";

const CommonLayout = ({ children }: childrenProps) => {
  return <div>{children}</div>;
};

export default CommonLayout;
