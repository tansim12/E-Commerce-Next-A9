"use client";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { useMyAnalyticsData } from "@/src/hooks/userProfile.hook";
import ComponentsLoading from "../ui/Loading/ComponentsLoading";

const MyAnalytics = () => {
  const { data, isPending } = useMyAnalyticsData();

  // Handle loading state
  if (isPending) {
    return <ComponentsLoading />;
  }

  // Assuming data format from your response
  const analyticsData = data || {};
  console.log(analyticsData?.totalShares);

  const summaryData = [
    { name: "Readers", value: analyticsData.totalReaders },
    { name: "Reactions", value: analyticsData.totalReactions },
    { name: "Comments", value: analyticsData.totalComments },
    { name: "Shares", value: analyticsData.totalShares },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      {/* Header Summary */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-lg md:text-2xl font-bold">Readers</h2>
          <p className=" text-2xl md:text-4xl">{analyticsData.totalReaders}</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-lg md:text-2xl font-bold">Reactions</h2>
          <p className=" text-2xl md:text-4xl">
            {analyticsData.totalReactions}
          </p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-lg md:text-2xl font-bold">Comments</h2>
          <p className=" text-2xl md:text-4xl">{analyticsData.totalComments}</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-lg md:text-2xl font-bold">Shares</h2>
          <p className=" text-2xl md:text-4xl">{analyticsData.totalShares}</p>
        </div>
      </div>

      {/* Summary Bar Chart */}
      <div className="w-full h-96 bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
        <ResponsiveContainer>
          <BarChart
            data={summaryData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
            <XAxis dataKey="name" tick={{ fill: "white" }} />
            <YAxis tick={{ fill: "white" }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MyAnalytics;
