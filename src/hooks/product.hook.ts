import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProductAction } from "../Service/Product/product.service";

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["CREATE_PRODUCT"],
    mutationFn: async ({ payload }: { payload: any }) => {
      return await createProductAction(payload);
    },
    onSuccess: (_data, variables) => {
      queryClient.refetchQueries(["ALL_PRODUCT"] as any);
    },
  });
};
