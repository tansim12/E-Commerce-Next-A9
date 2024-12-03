import React from "react";
import NavbarDropdown from "../ui/NavbarDropdown";
import Image from "next/image";
import logo from "@/src/assets/logo.png";
import Link from "next/link";
const DashboardNav = () => {
  return (
    <div className="flex justify-between">
      <div className=" w-[40%]">
        <Link href={"/"}>
          <Image className="w-[30%]" src={logo} alt="logo" />
        </Link>
      </div>
      <div>
        <NavbarDropdown />
      </div>
    </div>
  );
};

export default DashboardNav;
