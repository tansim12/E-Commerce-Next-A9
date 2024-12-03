import { USER_ROLE, USER_STATUS } from "./user.const";
// export interface TUserProfile {
//   _id?: string;
//   followers?: string[];
//   isCreateFollowing?: boolean;
//   userId?: string | TUser;
//   bio?: string;
//   description?: string;
//   profilePhoto?: string;
//   coverPhoto?: string;
// }

// export interface TUser {
//   id: string;
//   name: string;
//   email: string;
//   role?: "user" | "admin";
//   password?: string;
//   status?: "active" | "block";
//   lastPasswordChange?:string;
//   isDelete?: boolean;
//   userProfile?: TUserProfile;
//   createdAt?:string,
//   updatedAt?:string,

// }
// export type TUserRole = keyof typeof USER_ROLE;
// export type TUserStatus = keyof typeof USER_STATUS;


export type TUserRole = keyof typeof USER_ROLE; // User roles like "user", "admin"
export type TUserStatus = keyof typeof USER_STATUS; // Status like "active", "block"

// Extend TUserProfile to match the array structure
export interface TUserProfile {
  id: string;
  email: string;
  userId: string;
  profilePhoto?: string | null;
  coverPhoto?: string | null;
  bio?: string | null;
  gender?: string | null;
  contactNumber: string;
  status: TUserStatus; // Use the type to ensure valid status values
  createdAt: string;
  updatedAt: string;
}

// Update TUser to match the API response
export interface TUser {
  id: string;
  name: string;
  email: string;
  role: TUserRole; // Use the type to ensure valid role values
  password?: string;
  status: TUserStatus;
  lastPasswordChange: string | null;
  isDelete: boolean;
  createdAt: string;
  updatedAt: string;
  userProfile: TUserProfile[]; // It's an array of TUserProfile
}

