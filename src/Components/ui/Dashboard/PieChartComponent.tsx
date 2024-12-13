"use client";

import { Tooltip, Legend, ResponsiveContainer } from "recharts";
import { PieChart, Pie, Cell } from "recharts";

const PieChartComponent = ({
  paymentStatusBaseInfo,
}: {
  paymentStatusBaseInfo: any;
}) => {
  const paymentStatusColors = ["#4CAF50", "#FF9800", "#F44336"];
  return (
    <div>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={[
              { name: "Confirmed", value: paymentStatusBaseInfo?.confirm },
              { name: "Pending", value: paymentStatusBaseInfo?.pending },
              { name: "Cancelled", value: paymentStatusBaseInfo?.cancel },
            ]}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {/* Color configuration for each slice */}
            <Cell key="confirmed" fill={paymentStatusColors[0]} />
            <Cell key="pending" fill={paymentStatusColors[1]} />
            <Cell key="cancelled" fill={paymentStatusColors[2]} />
          </Pie>
          {/* Tooltip component to show data on hover */}
          <Tooltip
            contentStyle={{
              backgroundColor: "white",
              borderRadius: "8px",
              border: "1px solid #ddd",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            }}
            labelStyle={{ fontWeight: "bold", color: "#333" }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChartComponent;
