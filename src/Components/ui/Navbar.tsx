"use client";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/react";

import { Link } from "@nextui-org/link";
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import clsx from "clsx";
import { siteConfig } from "@/src/config/site";
import logo from "@/src/assets/logo.png";
import Image from "next/image";
import { usePathname } from "next/navigation";
import NavbarDropdown from "./NavbarDropdown";
import { useEffect, useState } from "react";

export const Navbar = () => {
  const pathName = usePathname();
  const [yValue, setYValue] = useState(0);
  const [toHide, setToHide] = useState(false);
  useEffect(() => {
    const showHeaderOnScrollUp = () => {
      if (yValue >= window.scrollY) {
        setToHide(false);
      } else {
        setToHide(true);
      }
      setYValue(window.scrollY);
    };

    window.addEventListener("scroll", showHeaderOnScrollUp);

    return () => {
      window.removeEventListener("scroll", showHeaderOnScrollUp);
    };
  }, [yValue]);
  return (
    <>
      <div>
        <NextUINavbar
          maxWidth="full"
          className={`fixed flex py-2 px-2 border-b z-[1] bg-bgColor backdrop-filter-blur transition-all duration-400 ${
            toHide ? "opacity-0 -translate-y-full" : "opacity-100 translate-y-0"
          }`}
        >
          <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
            <NavbarBrand as="li" className="gap-3 max-w-fit">
              <NextLink
                className="flex justify-start items-center gap-1"
                href="/"
              >
                <div className=" w-[60%]">
                  <Image src={logo} alt="logo" />
                </div>
                <p className="font-bold text-inherit"></p>
              </NextLink>
            </NavbarBrand>
            <ul className="hidden lg:flex gap-4 justify-start ml-2">
              {siteConfig?.navItems?.map((item) => (
                <NavbarItem key={item.href} className="text-white">
                  <NextLink
                    className={clsx(
                      pathName === item.href && "text-primary font-medium" // Apply active styles when the route matches
                    )}
                    color="foreground"
                    href={item.href}
                  >
                    {item.label}
                  </NextLink>
                </NavbarItem>
              ))}
            </ul>
          </NavbarContent>

          <NavbarContent
            className="hidden sm:flex basis-1/5 sm:basis-full"
            justify="end"
          >
            <NavbarItem className="hidden sm:flex gap-2">
              <NavbarDropdown />
            </NavbarItem>
          </NavbarContent>

          <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
            <NavbarMenuToggle />
          </NavbarContent>

          <NavbarMenu>
            <div className="mx-4 mt-2 flex flex-col gap-2">
              {siteConfig?.navMenuItems?.map((item, index) => (
                <NavbarMenuItem key={`${item}-${index}`}>
                  <Link
                    color={
                      index === 2
                        ? "primary"
                        : index === siteConfig.navMenuItems.length - 1
                          ? "danger"
                          : "foreground"
                    }
                    href={item.href}
                    size="lg"
                    className={clsx(
                      linkStyles({ color: "foreground" }),
                      pathName === item.href && "text-primary font-medium" // Apply active styles when the route matches
                    )}
                  >
                    {item.label}
                  </Link>
                </NavbarMenuItem>
              ))}
              <div className="my-3">
                <NavbarDropdown />
                </div>
            </div>
          </NavbarMenu>
        </NextUINavbar>
      </div>
    </>
  );
};
