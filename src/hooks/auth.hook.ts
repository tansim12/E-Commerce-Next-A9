import { useMutation, useQuery } from "@tanstack/react-query";

import toast from "react-hot-toast";
import {
  changePasswordAction,
  createLogin,
  createRegister,
  forgetPasswordAction,
} from "../Service/Auth/auth.service";

export const useUserRegister = () => {
  return useMutation({
    mutationKey: ["USER_REGISTER"],
    mutationFn: async (payload) => await createRegister(payload as any),
    onSuccess: () => {
      toast.success("User registered successfully");
    },
    onError: (error: any) => {
      toast.error(error?.message || "Registration failed");
    },
  });
};

export const useUserLogin = () => {
  return useMutation({
    mutationKey: ["USER_LOGIN"],
    mutationFn: async (payload) => await createLogin(payload as any),
    onSuccess: () => {
      toast.success("User Login successfully");
    },
    onError: (error: any) => {
      toast.error(error?.message || "Registration failed");
    },
  });
};

export const useForgetPassword = () => {
  return useMutation({
    mutationKey: ["FORGET_PASSWORD"],
    mutationFn: async (payload) => await forgetPasswordAction(payload),
    onSuccess: () => {
      toast.success("Please check you password");
    },
    onError: (error: any) => {
      toast.error(error?.message || "Forget Password Failed");
    },
  });
};
export const useChangePassword = () => {
  return useMutation({
    mutationKey: ["CHANGE_PASSWORD"],
    mutationFn: async ({ token, payload }: { token: string; payload: any }) =>
      await changePasswordAction(token, payload),
    onSuccess: () => {
      toast.success("User Password Change Done");
    },
    onError: (error: any) => {
      toast.error(error?.message || "Password Change failed");
    },
  });
};