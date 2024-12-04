"use server";

import { axiosInstance } from "@/src/axios/axiosInstance";

export const createShopAction = async (payload: any) => {
  try {
    const res = await axiosInstance.post(`/shop`, payload);
    return res?.data?.data;
  } catch (error) {
    console.log(error);
  }
};
