import { TUser } from "../User/user.types";

export type TComment = {
  _id: string;
  previousCommentId?: string| Partial<TUser>;
  userId?: string | Partial<TUser>; // ID of the user who made the comment
  postId?: string; // ID of the post to which the comment belongs
  message: string; // Comment message
  isDelete?: boolean;
  replies?: TComment[]; // Array of nested replies
  createdAt?:string
};
