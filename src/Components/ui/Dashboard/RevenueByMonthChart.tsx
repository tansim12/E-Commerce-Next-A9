"use Client";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
  } from "recharts";

const RevenueByMonthChart = ({revenueByMonth}:{revenueByMonth:any}) => {
  return (
    <div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={revenueByMonth}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueByMonthChart;
