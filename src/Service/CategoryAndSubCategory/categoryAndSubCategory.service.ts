"use server";
import { axiosInstance } from "@/src/axios/axiosInstance";
import { TQueryParams } from "@/src/Types/Filter/filter.type";

// category
export const adminFindAllCategory = async (
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
      `/cAndSubC/category?${params.toString()}`
    );
    return res?.data?.data;
  } catch (error) {
    console.log(error);
  }
};

export const adminCreateCategoryAction = async (payload: any) => {
  try {
    const res = await axiosInstance.post("/cAndSubC/create-category", payload);
    return res.data?.data;
  } catch (error) {
    console.log(error);
  }
};
export const adminUpdateCategoryAction = async (
  categoryId: string,
  payload: any
) => {
  try {
    const res = await axiosInstance.put(
      `/cAndSubC/update-category/${categoryId}`,
      payload
    );
    return res.data?.data;
  } catch (error) {
    console.log(error);
  }
};

// subcategory

export const adminFindAllSubCategoryAction = async (
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
      `/cAndSubC/sub-category?${params.toString()}`
    );
    return res?.data?.data;
  } catch (error) {
    console.log(error);
  }
};

export const adminCreateSubCategoryAction = async (payload: any) => {
  try {
    const res = await axiosInstance.post(
      "/cAndSubC/create-sub-category",
      payload
    );
    return res.data?.data;
  } catch (error) {
    console.log(error);
  }
};
export const adminUpdateSubCategoryAction = async (
  categoryId: string,
  payload: any
) => {
  try {
    const res = await axiosInstance.put(
      `/cAndSubC/update-sub-category/${categoryId}`,
      payload
    );
    return res.data?.data;
  } catch (error) {
    console.log(error);
  }
};

// others
export const existAllCategoryAction = async () => {
  try {
    const res = await axiosInstance.get(`/cAndSubC/category/admin/allCategory`);
    return res?.data?.data;
  } catch (error) {
    console.log(error);
  }
};
export const categoryBaseSubCategoryFindAction = async (
  categoryId: string | null
) => {
  try {
    const res = await axiosInstance.get(
      `/cAndSubC/category/categoryBaseSubCategory/${categoryId}`
    );
    return res?.data?.data;
  } catch (error) {
    console.log(error);
  }
};

export const publicFindAllCategoryAndSubCategoryAction = async () => {
  try {
    const res = await axiosInstance.get(`/cAndSubC`);
    return res?.data?.data;
  } catch (error) {
    console.log(error);
  }
};
