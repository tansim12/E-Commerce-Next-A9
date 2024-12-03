"use server"

import { axiosInstance } from "@/src/axios/axiosInstance";
import { TQueryParams } from "@/src/Types/Filter/filter.type";

export const adminFindAllUserAction = async (
    page: number,
    pageSize: number,
    args: TQueryParams[]
  ) => {
    const params = new URLSearchParams();
  
    params.append("page", page.toString());
    params.append("limit", pageSize.toString());
  
    // Loop through the args to dynamically append query parameters
    if (args) {
      args.forEach((item: TQueryParams) => {
        params.append(item.name, String(item.value)); // Convert value to string
      });
    }
    try {
      const res = await axiosInstance.get(`/user?${params.toString()}`); 
      return res?.data?.data;
    } catch (error) {
      console.log(error);   
    }
  };