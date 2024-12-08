import { ReactNode } from "react";

export interface childrenProps {
  children: ReactNode;
}

export interface ITitle {
  mainText: string;
  additionalText?: string;
  children?: ReactNode;
}

export interface TCartData {
  id: string;
  shopId: string;
  shopName: string;
  productName: string;
  price: number;
  buyQuantity: number;
  image: string;
  quantity: number;
  isUsePromo?: boolean;
}
