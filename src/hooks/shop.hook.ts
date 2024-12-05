import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createShopAction,
  shopUpdateAction,
  vendorFindHisShopAction,
} from "../Service/Shop/shop.service";

export const useVendorFindHisShop = () => {
  return useQuery({
    queryKey: ["VENDOR_FIND_HIS_SHOP"],
    queryFn: async () => await vendorFindHisShopAction(),
  });
};

export const useCreateShop = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["CREATE_SHOP"],
    mutationFn: async ({ payload }: { payload: any }) => {
      return await createShopAction(payload);
    },
    onSuccess: (_data, _variables) => {
      queryClient.refetchQueries(["FIND_ALL_SHOP"] as any);
      queryClient.refetchQueries(["VENDOR_FIND_HIS_SHOP"] as any);
    },
  });
};
export const useUpdateShop = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["UPDATE_SHOP"],
    mutationFn: async ({
      shopId,
      payload,
    }: {
      shopId: string;
      payload: any;
    }) => {
      return await shopUpdateAction(shopId, payload);
    },
    onSuccess: (_data, _variables) => {
      queryClient.refetchQueries(["FIND_ALL_SHOP"] as any);
      queryClient.refetchQueries(["VENDOR_FIND_HIS_SHOP"] as any);
    },
  });
};
