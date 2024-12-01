import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react"; // Import useState for toggling child visibility
import { FiChevronDown, FiChevronUp } from "react-icons/fi"; // Import icons for dropdown

interface SidebarItemProps {
  name: string;
  path: string;
  icon?: JSX.Element;
  children?: SidebarItemProps[];
}

export const SidebarItem = ({
  name,
  path,
  icon,
  children,
}: SidebarItemProps) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false); // State to handle dropdown visibility

  // Toggle dropdown visibility
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  // Check if the parent link or any child link is active
  const isParentActive = pathname === path;
  const isAnyChildActive = children
    ? children.some((child) => pathname === child.path)
    : false;

  return (
    <div className="mb-2">
      <Link
        href={path ? path : ""}
        className={`flex items-center justify-between px-4 py-2 my-2 rounded-lg text-white transition-all duration-200 cursor-pointer ${
          isParentActive || isAnyChildActive
            ? "bg-blue-600"
            : "hover:bg-gray-700"
        }`}
        onClick={handleToggle} // Toggle children visibility on parent click
      >
        <div className="flex items-center">
          {icon && <span className="mr-2">{icon}</span>}
          <span>{name}</span>
        </div>
        {/* Dropdown Icon */}
        {children ? isOpen ? <FiChevronUp /> : <FiChevronDown /> : null}
      </Link>

      {/* Render children if present and isOpen is true */}
      {children && isOpen && (
        <div className="ml-4">
          {children.map((child) => (
            <Link key={child.path} href={child.path}>
              <div
                className={`block px-4 py-2 my-1 rounded-lg text-white transition-all duration-200 ${
                  pathname === child.path ? "bg-blue-500" : "hover:bg-gray-600"
                }`}
              >
                {child.name}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
