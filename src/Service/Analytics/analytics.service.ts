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
export const shopAnalyticsAction = async () => {
  try {
    const res = await axiosInstance.get("/analytics/shop");
    return res?.data?.data;
  } catch (error) {
    // console.log(error);
  }
};
export const createNewsLetterAction = async (payload: any) => {
  try {
    const res = await axiosInstance.post("/analytics/newsletter", payload);
    return res?.data?.data;
  } catch (error) {
    // console.log(error);
  }
};
export const findAllNewsLetterAction = async () => {
  try {
    const res = await axiosInstance.get("/analytics/newsletter");
    return res?.data?.data;
  } catch (error) {
    // console.log(error);
  }
};
