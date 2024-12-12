"use server";
import { axiosInstance } from "@/src/axios/axiosInstance";
import { TQueryParams } from "@/src/Types/Filter/filter.type";

export const paymentCreateAction = async (payload: any) => {
  try {
    const res = await axiosInstance.post(`/payment`, payload);
    return res?.data?.data;
  } catch (error) {
    //   console.log(error);
  }
};

export const myAllPaymentHistoryAction = async (
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
      `/payment/my-payment-info?${params.toString()}`
    );
    return res?.data?.data;
  } catch (error) {
    console.log(error);
  }
};
export const adminAllPaymentHistoryAction = async (
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
      `/payment/all-payment-info?${params.toString()}`
    );
    return res?.data?.data;
  } catch (error) {
    console.log(error);
  }
};
export const shopAllPaymentHistoryAction = async (
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
      `/payment/shop-all-payment-info?${params.toString()}`
    );
    return res?.data?.data;
  } catch (error) {
    console.log(error);
  }
};

export const paymentUpdateAction = async (paymentId: string, payload: any) => {
  try {
    const res = await axiosInstance.put(
      `/payment/payment-update/${paymentId}`,
      payload
    );
    return res?.data?.data;
  } catch (error) {
    //   console.log(error);
  }
};
