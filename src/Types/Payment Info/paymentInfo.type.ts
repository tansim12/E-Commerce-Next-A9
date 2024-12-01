import { TUser } from "../User/user.types";

export type TPaymentInfo = {
  userId?: Partial<TUser>;
  _id?: string;
  mer_txnid?: string;
  cus_email?: string;
  cus_phone?: string;
  amount?: number;
  payment_type?: string;
  approval_code?: string;
  updatedAt?: string;
  createdAt?: string;
};
