"use server"
import { axiosInstance } from "@/src/axios/axiosInstance";

export const paymentCreateAction = async (payload: any) => {
    try {           
      const res = await axiosInstance.post(`/payment`, payload);
      return res?.data?.data;
    } catch (error) {
    //   console.log(error);
    }
  };