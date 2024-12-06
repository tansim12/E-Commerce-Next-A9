import { FaHome } from "react-icons/fa";
import { TbCategory, TbTransactionDollar } from "react-icons/tb";
import { ReactNode } from "react"; // Import ReactNode for JSX types
import { FiHome, FiSettings, FiUsers } from "react-icons/fi";
import { BsFillFileEarmarkPostFill } from "react-icons/bs";
import {
  MdOutlineManageAccounts,
  MdOutlineManageSearch,
  MdPayment,
} from "react-icons/md";

// Define the type for the sidebar items
interface SidebarItem {
  name: string;
  path?: string;
  icon?: ReactNode; // Allow icon as ReactNode (JSX element)
  children?: SidebarItem[]; // Optional children property for nested links
}

export const sidebarItems: {
  admin: SidebarItem[];
  user: SidebarItem[];
  vendor: SidebarItem[];
} = {
  admin: [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: <FaHome />,
    },
    {
      name: "Manage User",
      path: "/admin/manage-user",
      icon: <MdOutlineManageAccounts />,
    },
    {
      name: "Manage Shop",
      path: "/admin/manage-shop",
      icon: <MdOutlineManageSearch />,
    },
    {
      name: "Manage Category",
      icon: <TbCategory />,
      children: [
        { name: "Category", path: "/admin/manage-category/category" },
        { name: "Sub-Category", path: "/admin/manage-category/sub-category" },
      ],
    },
    {
      name: "Manage Product",
      path: "/admin/manage-products",
      icon: <TbCategory />,
    },

    {
      name: "Manage Payment",
      path: "/admin/manage-payment",
      icon: <MdPayment />,
    },
  ],
  vendor: [
    {
      name: "Dashboard",
      path: "/vendor/dashboard",
      icon: <FaHome />,
    },
    {
      name: "Shop Management",
      path: "/vendor/shop-management",
      icon: <MdOutlineManageSearch />,
    },
    {
      name: "Manage Product",
      icon: <TbCategory />,
      children: [
        {
          name: "Create Product",
          path: "/vendor/manage-product/crate-product",
        },
        { name: "view Product", path: "/vendor/manage-product/view-product" },
      ],
    },
  ],
  user: [
    {
      name: "Dashboard",
      path: "/user/dashboard",
      icon: <FiHome />,
    },
    {
      name: "My Posts",
      path: "/user/my-posts",
      icon: <BsFillFileEarmarkPostFill />,
    },
    {
      name: "Payments",
      path: "/user/payment-history",
      icon: <TbTransactionDollar />,
    },
  ],
};

//* children example
// admin: [
//   {
//     name: "Dashboard",
//     path: "/admin",
//     icon: <FaHome />,
//     children: [
//       { name: "Overview", path: "/admin/overview" },
//       { name: "Reports", path: "/admin/reports" },
//     ],
//   },
//   {
//     name: "Users",
//     path: "/admin/users", // its optional when its nested
//     icon: <FiUsers />,
//     children: [
//       { name: "Manage Users", path: "/admin/users/manage" },
//       { name: "Add New User", path: "/admin/users/add" },
//     ],
//   },
// ],
