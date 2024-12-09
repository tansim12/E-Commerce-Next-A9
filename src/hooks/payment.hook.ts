import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  adminAllPaymentHistoryAction,
  myAllPaymentHistoryAction,
  paymentCreateAction,
  paymentUpdateAction,
} from "../Service/Payment/payment.service";
import toast from "react-hot-toast";
import { TQueryParams } from "../Types/Filter/filter.type";

export const useCreatePayment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["CREATE_PAYMENT"],
    mutationFn: async ({ payload }: { payload: any }) => {
      return await paymentCreateAction(payload);
    },
    onSuccess: (_data, _variables) => {
     
      queryClient.refetchQueries(["MY_ALL_PAYMENT_HISTORY"] as any);
      queryClient.refetchQueries(["ADMIN_ALL_PAYMENT_HISTORY"] as any);
    },
    onError(error, variables, context) {
      toast.error("Payment Some thing went wrong, please new add to cart");
    },
  });
};

export const useMyAllPaymentHistory = (
  page: number,
  pageSize: number,
  params: TQueryParams[]
) => {
  return useQuery({
    queryKey: ["MY_ALL_PAYMENT_HISTORY", page, pageSize, params],
    queryFn: async () =>
      await myAllPaymentHistoryAction(page, pageSize, params),
  });
};
export const useAdminAllPaymentHistory = (
  page: number,
  pageSize: number,
  params: TQueryParams[]
) => {
  return useQuery({
    queryKey: ["ADMIN_ALL_PAYMENT_HISTORY", page, pageSize, params],
    queryFn: async () =>
      await adminAllPaymentHistoryAction(page, pageSize, params),
  });
};

export const useUpdatePayment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["UPDATE_PAYMENT"],
    mutationFn: async ({
      paymentId,
      payload,
    }: {
      paymentId: any;
      payload: any;
    }) => {
      return await paymentUpdateAction(paymentId, payload);
    },
    onSuccess: (_data, _variables) => {
 
      queryClient.refetchQueries(["ADMIN_ALL_PAYMENT_HISTORY"] as any);
      queryClient.refetchQueries(["MY_ALL_PAYMENT_HISTORY"] as any);
    },
    onError(error, variables, context) {
      toast.error("Payment Some thing went wrong, please new add to cart");
    },
  });
};
