import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TQueryParams } from "../Types/Filter/filter.type";
import {
  adminCreateCategoryAction,
  adminFindAllCategory,
  adminUpdateCategoryAction,
} from "../Service/CategoryAndSubCategory/categoryAndSubCategory.service";

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
