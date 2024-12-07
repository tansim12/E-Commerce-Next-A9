import { TCartData } from "../Types";

export const getAddToCartData = (): TCartData[] => {
  try {
    const data = localStorage.getItem("addToCart");  
    return data ? (JSON.parse(data) as TCartData[]) : [];
  } catch (error) {
    return [];
  }
};
