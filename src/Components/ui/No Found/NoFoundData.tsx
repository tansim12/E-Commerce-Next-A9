import Image from "next/image";
import React from "react";
import noFound from "@/src/assets/noFoundData.png";
const NoFoundData = () => {
  return (
    <div className="w-full flex justify-center items-center my-10 bg-white min-h-96">
      <Image src={noFound} width={300} height={300} alt="noFound" />
    </div>
  );
};

export default NoFoundData;
