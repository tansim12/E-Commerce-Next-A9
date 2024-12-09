import React, { ReactNode } from "react";

const ProductLayout = ({
  children,
  filter,
}: {
  children: ReactNode;
  filter: ReactNode;
}) => {
  return (
    <>
      <div className="container mx-auto p-3">
        <div className=" flex flex-col md:flex md:flex-row gap-5">
          <div className=" max-h-screen basis-1/5" id="stickySidebarImp">
            <div className="">{filter}</div>
          </div>
          <div className="basis-4/5">{children}</div>
        </div>
      </div>
    </>
  );
};

export default ProductLayout;
