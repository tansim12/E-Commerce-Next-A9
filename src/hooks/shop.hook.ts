import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  adminFindAllShopsAction,
  createFollowAndUnFollowShopAction,
  createShopAction,
  findSingleUserFollowAction,
  isExistShopAction,
  publicFindSingleShopAction,
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
export const usePublicFindSingleShop = (
  shopId: string,
  page: number,
  pageSize: number,
  params: TQueryParams[]
) => {
  return useQuery({
    queryKey: ["PUBLIC_FIND_SINGLE_SHOP", shopId, page, pageSize, params],
    queryFn: async () =>
      await publicFindSingleShopAction(shopId, page, pageSize, params),
  });
};

export const useFindSingleUserFollow = (shopId: string) => {
  return useQuery({
    queryKey: [shopId, "SINGLE_USER_SHOP_FOLLOW"],
    queryFn: async () => await findSingleUserFollowAction(shopId),
  });
};
export const useIsExistShop = () => {
  return useQuery({
    queryKey: ["ISEXIST"],
    queryFn: async () => await isExistShopAction(),
  });
};

export const useCreateFollowAndUnFollowShop = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["CREATE_SHOP_FOLLOW_AND_UNFOLLOW"],
    mutationFn: async ({ payload }: { payload: any }) => {
      return await createFollowAndUnFollowShopAction(payload);
    },
    onSuccess: (_data, _variables) => {
      queryClient.refetchQueries(["SINGLE_USER_SHOP_FOLLOW"] as any);
      queryClient.refetchQueries(["PUBLIC_FIND_SINGLE_SHOP"] as any);
    },
  });
};
