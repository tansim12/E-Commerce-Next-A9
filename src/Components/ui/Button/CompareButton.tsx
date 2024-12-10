import React from "react";
import { RiFileCopy2Fill } from "react-icons/ri";

const CompareButton = () => {
  return (
    <div className="text-sm w-full flex justify-center items-center mb-2 border border-white rounded-xl p-2">
      <button className="flex justify-center items-center gap-2">
        <RiFileCopy2Fill /> Add To Compare
      </button>
    </div>
  );
};

export default CompareButton;
