import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TQueryParams } from "../Types/Filter/filter.type";
import {
  adminCreateCategoryAction,
  adminCreateSubCategoryAction,
  adminFindAllCategory,
  adminFindAllSubCategoryAction,
  adminUpdateCategoryAction,
  adminUpdateSubCategoryAction,
  categoryBaseSubCategoryFindAction,
  existAllCategoryAction,
  publicFindAllCategoryAndSubCategoryAction,
} from "../Service/CategoryAndSubCategory/categoryAndSubCategory.service";
import { ZodNullableDef } from "zod";

// category
export const useAdminFindAllCategory = (
  page: number,
  pageSize: number,
  params: TQueryParams[]
) => {
  return useQuery({
    queryKey: ["ADMIN_FIND_ALL_CATEGORY", page, pageSize, params],
    queryFn: async () => await adminFindAllCategory(page, pageSize, params),
  });
};

export const useAdminCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["ADMIN_CREATE_CATEGORY"],
    mutationFn: async ({ payload }: { payload: any }) => {
      return await adminCreateCategoryAction(payload);
    },
    onSuccess: (_data, variables) => {
      queryClient.refetchQueries(["ADMIN_FIND_ALL_CATEGORY"] as any);
    },
  });
};
export const useAdminUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["ADMIN_UPDATE_CATEGORY"],
    mutationFn: async ({
      categoryId,
      payload,
    }: {
      categoryId: string;
      payload: any;
    }) => {
      return await adminUpdateCategoryAction(categoryId, payload);
    },
    onSuccess: (_data, variables) => {
      queryClient.refetchQueries(["ADMIN_FIND_ALL_CATEGORY"] as any);
    },
  });
};

// sub category
export const useAdminFindAllSubCategory = (
  page: number,
  pageSize: number,
  params: TQueryParams[]
) => {
  return useQuery({
    queryKey: ["ADMIN_FIND_ALL_SUB_CATEGORY", page, pageSize, params],
    queryFn: async () =>
      await adminFindAllSubCategoryAction(page, pageSize, params),
  });
};

export const useAdminCreateSubCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["ADMIN_CREATE_SUB_CATEGORY"],
    mutationFn: async ({ payload }: { payload: any }) => {
      return await adminCreateSubCategoryAction(payload);
    },
    onSuccess: (_data, variables) => {
      queryClient.refetchQueries(["ADMIN_FIND_ALL_SUB_CATEGORY"] as any);
    },
  });
};
export const useAdminUpdateSubCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["ADMIN_UPDATE_SUB_CATEGORY"],
    mutationFn: async ({
      categoryId,
      payload,
    }: {
      categoryId: string;
      payload: any;
    }) => {
      return await adminUpdateSubCategoryAction(categoryId, payload);
    },
    onSuccess: (_data, variables) => {
      queryClient.refetchQueries(["ADMIN_FIND_ALL_SUB_CATEGORY"] as any);
    },
  });
};

// other

export const useExistAllCategory = () => {
  return useQuery({
    queryKey: ["EXIST_ALL_CATEGORY"],
    queryFn: async () => await existAllCategoryAction(),
  });
};
export const useCategoryBaseSubCategoryFind = (categoryId: string | null) => {
  return useQuery({
    queryKey: ["CATEGORY_BASE_SUB_CATEGORY", categoryId],
    queryFn: async () => await categoryBaseSubCategoryFindAction(categoryId),
  });
};
export const usePublicFindAllCategoryAndSubCategory = () => {
  return useQuery({
    queryKey: ["PUBLIC_FIND_ALL_CATEGORY_AND_SUBCATEGORY"],
    queryFn: async () => await publicFindAllCategoryAndSubCategoryAction(),
  });
};
