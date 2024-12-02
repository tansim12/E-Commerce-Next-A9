
import axios from "axios";
import { cookies } from "next/headers";

import envConfig from "@/src/config/envConfig";
import { getNewAccessToken } from "../Service/Auth/auth.service";


export const axiosInstance = axios.create({
  baseURL: envConfig.baseApi,
  withCredentials: true,
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const accessToken = cookies().get("accessToken")?.value;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const config = error.config;

    if (error?.response?.status === 401 && !config?.sent) {
      config.sent = true;
      const res = await getNewAccessToken();
      const accessToken = res?.data?.accessToken;

      config.headers["Authorization"] = `Bearer ${accessToken}`;
      cookies().set("accessToken", accessToken);

      return axiosInstance(config);
    } else {
      return Promise.reject(error);
    }
  }
);