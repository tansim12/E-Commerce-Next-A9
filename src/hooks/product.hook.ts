import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  adminFindAllProductsAction,
  createProductAction,
  findShopAllProductsAction,
  publicFlashSaleProductsAction,
  publicPromoCheckAction,
  publicSingleProductAction,
  publicTopSaleProductsAction,
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
export const usePublicTopSaleProducts = (
  page: number,
  pageSize: number,
  params: TQueryParams[]
) => {
  return useQuery({
    queryKey: ["TOP_SALE_PRODUCTS", page, pageSize, params],
    queryFn: async () =>
      await publicTopSaleProductsAction(page, pageSize, params),
  });
};
export const usePublicSingleProduct = (productId: string) => {
  return useQuery({
    queryKey: ["PUBLIC_SINGLE_PRODUCT"],
    queryFn: async () => await publicSingleProductAction(productId),
  });
};

export const usePublicFlashSaleProducts = (
  page: number,
  pageSize: number,
  params: TQueryParams[]
) => {
  return useQuery({
    queryKey: ["FLASH_SALE_PRODUCTS", page, pageSize, params],
    queryFn: async () =>
      await publicFlashSaleProductsAction(page, pageSize, params),
  });
};

export const usePublicPromoCheck = () => {
  return useMutation({
    mutationKey: ["PROMO_CHECK"],
    mutationFn: async ({ payload }: { payload: any }) => {
      return await publicPromoCheckAction(payload);
    },
  });
};
