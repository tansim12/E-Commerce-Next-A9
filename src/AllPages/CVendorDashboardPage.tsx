"use client";
import React from "react";
import RevenueByMonthChart from "../Components/ui/Dashboard/RevenueByMonthChart";
import PieChartComponent from "../Components/ui/Dashboard/PieChartComponent";

const CVendorDashboardPage = ({ data }: { data: any }) => {
    console.log(data);
    
  const {
    totalRevenueData,
    revenueByMonth,
    totalActiveProducts,
    totalInactiveProducts,
    totalFlashSaleProducts,
  } = data || {};

  const summaryData = [
    { name: "Total Revenue", value: totalRevenueData?._sum?.amount },
    { name: "Active Products", value: totalActiveProducts },
    { name: "Inactive Products", value: totalInactiveProducts },
    { name: "Flash Sale Products", value: totalFlashSaleProducts },
  ];

  return (
    <div className="p-2">
      {/* Header Summary */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {summaryData?.map((item: any) => (
          <div className="bg-gray-800 p-2 md:p-4 rounded-lg">
            <h2 className="text-[16px] md:text-2xl font-bold">{item?.name}</h2>
            <p className=" text-2xl md:text-4xl  text-primary">
              {item?.value ? item?.value : 0}
            </p>
          </div>
        ))}
      </div>

      {/* Revenue by Month Line Chart */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Revenue by Month</h2>
        <RevenueByMonthChart revenueByMonth={revenueByMonth} />
      </div>
    </div>
  );
};

export default CVendorDashboardPage;
