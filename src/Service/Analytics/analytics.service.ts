"use server";

import { axiosInstance } from "@/src/axios/axiosInstance";

export const adminAnalyticsAction = async () => {
  try {
    const res = await axiosInstance.get("/analytics/admin");
    return res?.data?.data;
  } catch (error) {
    // console.log(error);
  }
};
