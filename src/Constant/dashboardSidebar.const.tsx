import { FaHome } from "react-icons/fa";
import { TbTransactionDollar } from "react-icons/tb";
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
  path: string;
  icon?: ReactNode; // Allow icon as ReactNode (JSX element)
  children?: SidebarItem[]; // Optional children property for nested links
}

export const sidebarItems: { admin: SidebarItem[]; user: SidebarItem[] } = {
  admin: [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: <FaHome />,
    },
    {
      name: "My Posts",
      path: "/admin/my-posts",
      icon: <BsFillFileEarmarkPostFill />,
    },
    {
      name: "Manage Posts",
      path: "/admin/manage-posts",
      icon: <MdOutlineManageSearch />,
    },
    {
      name: "Manage User",
      path: "/admin/manage-user",
      icon: <MdOutlineManageAccounts />,
    },
    {
      name: "Manage Payment",
      path: "/admin/manage-payment",
      icon: <MdPayment />,
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
//     path: "/admin/users",
//     icon: <FiUsers />,
//     children: [
//       { name: "Manage Users", path: "/admin/users/manage" },
//       { name: "Add New User", path: "/admin/users/add" },
//     ],
//   },
// ],
