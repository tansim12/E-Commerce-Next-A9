"use client"
import React, { useState } from "react";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css"; // Default rc-pagination styles
import "./pagination.css"; // Custom styles
import { RiArrowDropDownLine } from "react-icons/ri";
const CustomPagination = ({ total, setPage, page, setPageSize, pageSize }:{total:number,setPage:any,page:number,setPageSize:any,pageSize:number}) => {
  const handlePageChange = (page:number) => {
    setPage(page);
  };

  const handlePageSizeChange = (event:any) => {
    setPageSize(parseInt(event.target.value)); // Update page size (limit)
    setPage(1); // Reset to first page when limit changes
  };

  const currentTotal = page * pageSize;

  return (
    <div className="flex items-center p-6 space-x-4 ">
      {/* Pagination Component */}
      <Pagination
        current={page}
        total={total}
        pageSize={pageSize}
        showQuickJumper
        onChange={handlePageChange}
        locale={{
          jump_to: "Go", // Custom "Go" text
          page: "Size", // Custom "Page" label
          prev_page: "Previous",
          next_page: "Next",
        }}
        className="pagination-container"
      />

      {/* Page Size Selector */}
      <div className="relative inline-block">
        {/* Page Size Selector */}
        <select
          id="pageSize"
          value={pageSize}
          onChange={handlePageSizeChange}
          className="border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500 appearance-none w-full pr-7"
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
        {/* Dropdown Icon */}
        <RiArrowDropDownLine className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
      </div>
      {currentTotal >= total ? (
        <div>
          {total} of {total}
        </div>
      ) : (
        <div>
          {currentTotal} of {total}
        </div>
      )}
    </div>
  );
};

export default CustomPagination;
