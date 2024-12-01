"use client";

import { useState } from "react";
import CustomDrawer from "../ui/Custom Drawer/CustomDrawer";
import { useUser } from "@/src/Context/user.context";
import DashboardMenuItems from "./DashboardMenuItems";
import { RiMenuAddFill } from "react-icons/ri";

const DashboardSidebar = () => {
  const { user } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* small device  */}
      <div>
        <CustomDrawer isOpen={isOpen} onClose={toggleDrawer}>
          <DashboardMenuItems role={user?.role} />
        </CustomDrawer>
      </div>
      <button
        onClick={toggleDrawer}
        className="p-2 bg-base text-white rounded-md block lg:hidden "
      >
        <span className="flex justify-center items-center gap-4">
          {" "}
          Menu <RiMenuAddFill />
        </span>
      </button>

      {/* large device  */}
      <div className="hidden lg:block">
        <DashboardMenuItems role={user?.role} />
      </div>
    </div>
  );
};

export default DashboardSidebar;
