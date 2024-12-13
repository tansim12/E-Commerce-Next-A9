"use server";

import { axiosInstance } from "@/src/axios/axiosInstance";
import { TQueryParams } from "@/src/Types/Filter/filter.type";

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

export const adminFindAllShopsAction = async (
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
      `/shop/admin/find-all-shops?${params.toString()}`
    );
    return res?.data?.data;
  } catch (error) {
    console.log(error);
  }
};
export const publicFindSingleShopAction = async (
  shopId: string,
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
    const res = await axiosInstance.get(`/shop/${shopId}?${params.toString()}`);
    return res?.data?.data;
  } catch (error) {
    console.log(error);
  }
};

export const findSingleUserFollowAction = async (shopId: string) => {
  try {
    const res = await axiosInstance.get(`/shop/user/shop-following/${shopId}`);
    return res?.data?.data;
  } catch (error) {
    console.log(error);
  }
};
export const createFollowAndUnFollowShopAction = async (payload: any) => {
  try {
    console.log(payload);

    const res = await axiosInstance.post(`/shop/user/shop-following`, payload);
    return res?.data?.data;
  } catch (error) {
    // console.log(error);
  }
};
