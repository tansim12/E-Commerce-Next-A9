"use server"
import { axiosInstance } from "@/src/axios/axiosInstance";
import { TQueryParams } from "@/src/Types/Filter/filter.type";

export const findShopAllProductsAction = async (
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
      const res = await axiosInstance.get(
        `/product/shop/shop-all-products?${params.toString()}`
      );
      return res?.data?.data;
    } catch (error) {
      console.log(error);
    }
  };
  
  export const createProductAction = async (payload: any) => {
    try {
      const res = await axiosInstance.post("/product", payload);
      return res.data?.data;
    } catch (error) {
      console.log(error);
    }
  };
  export const updateProductAction = async (productId:string,payload: any) => {
    try {
      const res = await axiosInstance.put(`/product/${productId}`, payload);
      return res.data?.data;
    } catch (error) {
      console.log(error);
    }
  };