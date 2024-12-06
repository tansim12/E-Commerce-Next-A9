import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  adminFindAllShopsAction,
  createShopAction,
  shopUpdateAction,
  vendorFindHisShopAction,
} from "../Service/Shop/shop.service";
import { TQueryParams } from "../Types/Filter/filter.type";

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
      queryClient.refetchQueries(["ADMIN_FIND_Shop"] as any);
    },
  });
};

export const useAdminFindAllShops = (
  page: number,
  pageSize: number,
  params: TQueryParams[]
) => {
  return useQuery({
    queryKey: ["ADMIN_FIND_Shop", page, pageSize, params],
    queryFn: async () => await adminFindAllShopsAction(page, pageSize, params),
  });
};
