import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TQueryParams } from "../Types/Filter/filter.type";
import {
  adminFindAllUserAction,
  adminUserUpdateAction,
  findMyProfileAction,
  updateMyProfileAction,
} from "../Service/User/user.service";
import { TUser } from "../Types/User/user.types";

export const useAdminFindAllUser = (
  page: number,
  pageSize: number,
  params: TQueryParams[]
) => {
  return useQuery({
    queryKey: ["ADMIN_FIND_ALL_USER", page, pageSize, params], // queryKey with userId
    queryFn: async () => await adminFindAllUserAction(page, pageSize, params),
  });
};

export const useAdminUserProfileUpdate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["ADMIN_UPDATE_USER_INFO"], // A unique mutation key
    mutationFn: async ({
      userId,
      payload,
    }: {
      userId: string;
      payload: Partial<TUser>;
    }) => {
      return await adminUserUpdateAction(userId, payload); // Perform the API call to update user info
    },
    onSuccess: (_data, variables) => {
      // Revalidate queries based on userId or other parameters
      queryClient.refetchQueries(["ADMIN_FIND_ALL_USER"] as any);
    },
    onError: (error) => {
      console.error("Error updating user profile:", error);
    },
  });
};

export const useFindMyProfile = () => {
  return useQuery({
    queryKey: ["FIND_MY_PROFILE"], // queryKey with userId
    queryFn: async () => await findMyProfileAction(),
  });
};

export const useUpdateMyProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["UPDATE_MY_PROFILE"], // A unique mutation key
    mutationFn: async ({ payload }: { payload: Partial<TUser> }) => {
      return await updateMyProfileAction(payload); // Perform the API call to update user info
    },
    onSuccess: (_data, variables) => {
      // Revalidate queries based on userId or other parameters
      queryClient.refetchQueries(["FIND_MY_PROFILE"] as any);
    },
  });
};
