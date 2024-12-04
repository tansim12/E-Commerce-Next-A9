import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createShopAction } from "../Service/Shop/shop.service";

export const useCreateShop = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["CREATE_SHOP"],
    mutationFn: async ({ payload }: { payload: any }) => {
      return await createShopAction(payload);
    },
    onSuccess: (_data, _variables) => {
      queryClient.refetchQueries(["FIND_ALL_SHOP"] as any);
    },
  });
};
