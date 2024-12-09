"use client";
import React, { useState } from "react";

import { FaFilter } from "react-icons/fa";
import CustomDrawer from "../Components/ui/Custom Drawer/CustomDrawer";
import PostFilterSidebar from "../Components/ui/Filter/PostFilterSidebar";
const CPostFilterSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <CustomDrawer isOpen={isOpen} onClose={toggleDrawer}>
        <PostFilterSidebar />
      </CustomDrawer>
      <button
        onClick={toggleDrawer}
        className="p-2 bg-base text-white rounded-md block md:hidden "
      >
        <span className="flex justify-center items-center gap-4">
          {" "}
          Filter <FaFilter />
        </span>
      </button>

      <div className=" hidden md:block">
        <PostFilterSidebar />
      </div>
    </>
  );
};

export default CPostFilterSidebar;
