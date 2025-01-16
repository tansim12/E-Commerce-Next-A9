import VirtualTryOn from "@/src/AllPages/VirtualTryPage";
import React from "react";

const page = ({ searchParams }: { searchParams: any }) => {

  return (
    <div>
      <VirtualTryOn searchParams={searchParams} />
    </div>
  );
};

export default page;
