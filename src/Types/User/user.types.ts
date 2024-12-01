import { USER_ROLE, USER_STATUS } from "./user.const";
export interface TUserProfile {
  _id?: string;
  followers?: string[];
  isCreateFollowing?: boolean;
  userId?: string | TUser;
  bio?: string;
  description?: string;
  profilePhoto?: string;
  coverPhoto?: string;
}

export interface TUser {
  _id: string;
  name: string;
  email: string;
  role?: "user" | "admin";
  password: string;
  phone: string;
  status?: "active" | "block";
  passwordChangeAt?: Date;
  isDelete?: boolean;
  profilePhoto?: string;
  isVerified?: boolean;
  userProfile?: TUserProfile;
  createdAt?:string,
  updatedAt?:string,

}
export type TUserRole = keyof typeof USER_ROLE;
export type TUserStatus = keyof typeof USER_STATUS;
