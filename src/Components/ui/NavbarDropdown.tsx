"use client";

import { privateRotes } from "@/src/Constant/global.const";
import { useUser } from "@/src/Context/user.context";
import { logoutFn } from "@/src/Service/Auth/auth.service";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";

import { usePathname, useRouter } from "next/navigation";
import { FaCheckCircle } from "react-icons/fa";
import CustomButton from "./Button/CustomButton";

export default function NavbarDropdown() {
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigation = (pathname: string) => {
    router.push(pathname);
  };

  const { user, setIsLoading: userSetLoading } = useUser();
  return (
    <>
      {user?.id ? (
        <Dropdown>
          <DropdownTrigger>
            <div className="flex items-center flex-col justify-center p-2">
              <Avatar
                className="cursor-pointer border-base border-2"
                src={
                  user?.userProfile?.[0]?.profilePhoto ||
                  "https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg"
                }
              />
              <p className="font-semibold">{user?.name?.slice(0, 10)} </p>
            </div>
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions">
           
            <DropdownItem
              onClick={() => handleNavigation(`/${user?.role}/dashboard`)}
              color="primary"
            >
              Dashboard
            </DropdownItem>
            <DropdownItem
              onClick={async () => {
                userSetLoading(true);
                await logoutFn();
                // Regex for private routes with dynamic segments
                const isPrivateRoute = privateRotes.some((route: string) =>
                  new RegExp(`^${route.replace(":page*", ".*")}$`).test(
                    pathname as string
                  )
                );
                // Check if the current route is a private route
                if (isPrivateRoute) {
                  // Redirect after logout and loading is done
                  await router.push("/");
                }
                // Reset loading state
                userSetLoading(false);
              }}
              key="delete"
              className="text-danger"
              color="danger"
            >
              Logout
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      ) : (
        <div>
          <CustomButton
            onClick={() => handleNavigation("/login")}
            name="Login"
            customCss="text-white font-bold"
          />
        </div>
      )}
    </>
  );
}
