import CVendorDashboardPage from "@/src/AllPages/CVendorDashboardPage";
import {  shopAnalyticsAction } from "@/src/Service/Analytics/analytics.service";
import React from "react";

const VendorDashboardPage = async () => {
  const result = await shopAnalyticsAction();
  return (
    <div>
      <CVendorDashboardPage data={result} />
    </div>
  );
};

export default VendorDashboardPage;
