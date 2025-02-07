import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createNewsLetterAction,
  findAllNewsLetterAction,
  newsletterGroupMessageSendAction,
} from "../Service/Analytics/analytics.service";

export const useNewsLetterCreate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["CREATE_NEW_LETTER"],
    mutationFn: async ({ payload }: { payload: any }) => {
      return await createNewsLetterAction(payload);
    },
    onSuccess: (_data, variables) => {
      queryClient.refetchQueries(["FIND_ALL_NEWSLETTER"] as any);
    },
  });
};

export const useFindAllNewsLetterEmail = () => {
  return useQuery({
    queryKey: ["FIND_ALL_NEWSLETTER"],
    queryFn: async () => await findAllNewsLetterAction(),
  });
};

export const useNewsletterGroupMessageSend = () => {
  return useMutation({
    mutationKey: ["NEWLETTER_GORUP_MESSAGE"],
    mutationFn: async ({ payload }: { payload: any }) => {
      return await newsletterGroupMessageSendAction(payload);
    },
  });
};
