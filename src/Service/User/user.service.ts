"use server";

import { axiosInstance } from "@/src/axios/axiosInstance";
import { TQueryParams } from "@/src/Types/Filter/filter.type";
import { TUser } from "@/src/Types/User/user.types";

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

export const adminUserUpdateAction = async (
  userId: string,
  payload: Partial<TUser>
) => {
  try {
    const res = await axiosInstance.put(
      `/user/admin-update-user/${userId}`,
      payload
    );
    return res?.data?.data;
  } catch (error) {}
};
export const updateMyProfileAction = async (payload: any) => {
  try {
    console.log(payload);

    const res = await axiosInstance.put(`/user/update-my-profile`, payload);
    return res?.data?.data;
  } catch (error) {}
};
export const findMyProfileAction = async () => {
  try {
    const res = await axiosInstance.get(`/user/find/my-profile`);
    return res?.data?.data;
  } catch (error) {}
};
export const createUserWishlistAction = async (payload: any) => {
  try {
    const res = await axiosInstance.post(`/user/wishlist`, payload);
    return res?.data?.data;
  } catch (error) {}
};

export const findHisAllWishlistAction = async (
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
      `/user/wishlist/all?${params.toString()}`
    );
    return res?.data?.data;
  } catch (error) {
    console.log(error);
  }
};

export const singleDeleteWishListAction = async (wishListId: any) => {
  try {
    const res = await axiosInstance.delete(`/user/wishlist/all/${wishListId}`);
    return res?.data?.data;
  } catch (error) {}
};
