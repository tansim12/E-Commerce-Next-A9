import { sidebarItems } from "@/src/Constant/dashboardSidebar.const";
import React from "react";
import { SidebarItem } from "./SidebarItem";

// Define a type for valid roles
type Role = "admin" | "user";

// Define the props for the DashboardMenuItems component
interface DashboardMenuItemsProps {
  role?: Role; // Optional role
}

const DashboardMenuItems: React.FC<DashboardMenuItemsProps> = ({
  role = "user",
}) => {
  return (
    <div className="bg-gray-800 text-white min-h-[calc(100vh-100px)] rounded-2xl">
      <div className=" font-bold text-lg border-b border-gray-700 text-center h-20 flex justify-center items-center">
        Welcome To {role}
      </div>
      <nav className="px-2">
        {sidebarItems[role]?.map((item) => (
          <SidebarItem
            key={item.path}
            name={item.name}
            path={item.path}
            icon={item.icon as any}
            children={item.children as any}
           
          />
        ))}
      </nav>
    </div>
  );
};

export default DashboardMenuItems;
