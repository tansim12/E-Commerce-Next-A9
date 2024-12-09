import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { myAllPaymentHistoryAction, paymentCreateAction } from "../Service/Payment/payment.service";
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
      // todo more query refetch there such as product page
      queryClient.refetchQueries(["TOP_SALE_PRODUCTS"] as any);
      queryClient.refetchQueries(["FLASH_SALE_PRODUCTS"] as any);
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