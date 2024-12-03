import { useQuery } from "@tanstack/react-query";
import { TQueryParams } from "../Types/Filter/filter.type";
import { adminFindAllUserAction } from "../Service/User/user.service";

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