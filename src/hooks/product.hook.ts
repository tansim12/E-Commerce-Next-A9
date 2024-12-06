import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  adminFindAllProductsAction,
  createProductAction,
  findShopAllProductsAction,
  updateProductAction,
} from "../Service/Product/product.service";
import { TQueryParams } from "../Types/Filter/filter.type";

export const useShopBaseFindAllProduct = (
  page: number,
  pageSize: number,
  params: TQueryParams[]
) => {
  return useQuery({
    queryKey: ["VENDOR_ALL_PRODUCT", page, pageSize, params],
    queryFn: async () =>
      await findShopAllProductsAction(page, pageSize, params),
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["CREATE_PRODUCT"],
    mutationFn: async ({ payload }: { payload: any }) => {
      return await createProductAction(payload);
    },
    onSuccess: (_data, variables) => {
      queryClient.refetchQueries(["VENDOR_ALL_PRODUCT"] as any);
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["UPDATE_PRODUCT"],
    mutationFn: async ({
      productId,
      payload,
    }: {
      productId: string;
      payload: any;
    }) => {
      return await updateProductAction(productId, payload);
    },
    onSuccess: (_data, variables) => {
      queryClient.refetchQueries(["VENDOR_ALL_PRODUCT"] as any);
      queryClient.refetchQueries(["ADMIN_FIND_PRODUCT"] as any);
    },
  });
};

export const useAdminFindAllProducts = (
  page: number,
  pageSize: number,
  params: TQueryParams[]
) => {
  return useQuery({
    queryKey: ["ADMIN_FIND_PRODUCT", page, pageSize, params],
    queryFn: async () =>
      await adminFindAllProductsAction(page, pageSize, params),
  });
};
