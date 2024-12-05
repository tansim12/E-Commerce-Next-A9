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
export const vendorFindHisShopAction = async () => {
  try {
    const res = await axiosInstance.get(`/shop/vendor/vendor-my-shop`);
    return res?.data?.data;
  } catch (error) {
    console.log(error);
  }
};
export const shopUpdateAction = async (shopId: string, payload: any) => {
  try {
    const res = await axiosInstance.put(`/shop/${shopId}`, payload);    
    return res?.data?.data;
  } catch (error) {
    console.log(error);
  }
};
