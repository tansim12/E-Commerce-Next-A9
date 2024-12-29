import { FaHome, FaRegNewspaper, FaUser } from "react-icons/fa";
import { TbCategory, TbTransactionDollar } from "react-icons/tb";
import { ReactNode } from "react"; // Import ReactNode for JSX types
import { FiHome } from "react-icons/fi";

import { MdOutlineManageAccounts, MdOutlineManageSearch } from "react-icons/md";
import { GoCodeReview } from "react-icons/go";

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
      name: "Admin Profile",
      path: "/admin/profile",
      icon: <FaUser />,
    },
    {
      name: "Manage User",
      path: "/admin/manage-user",
      icon: <MdOutlineManageAccounts />,
    },
    {
      name: "Manage Payment",
      path: "/admin/manage-payment",
      icon: <TbCategory />,
    },
    {
      name: "Manage Shops",
      path: "/admin/manage-shops",
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
      name: "Manage Products",
      path: "/admin/manage-products",
      icon: <TbCategory />,
    },
    {
      name: "My Payments",
      path: "/admin/payment-history",
      icon: <TbTransactionDollar />,
    },
    {
      name: "News Letter",
      path: "/admin/newsletter",
      icon: <FaRegNewspaper />,
    },
  ],
  vendor: [
    {
      name: "Dashboard",
      path: "/vendor/dashboard",
      icon: <FaHome />,
    },
    {
      name: "Vendor Profile",
      path: "/vendor/profile",
      icon: <FaUser />,
    },
    {
      name: "Shop Management",
      path: "/vendor/shop-management",
      icon: <MdOutlineManageSearch />,
    },
    {
      name: "Manage Payment",
      path: "/vendor/manage-payment",
      icon: <TbCategory />,
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
    {
      name: "My Payments",
      path: "/vendor/payment-history",
      icon: <TbTransactionDollar />,
    },
  ],
  user: [
    {
      name: "Dashboard",
      path: "/user/dashboard",
      icon: <FiHome />,
    },

    {
      name: "Payments",
      path: "/user/payment-history",
      icon: <TbTransactionDollar />,
    },
    {
      name: "Review",
      path: "/user/product-review",
      icon: <GoCodeReview />,
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
