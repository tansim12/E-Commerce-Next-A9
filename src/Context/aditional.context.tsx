import {
  ReactNode,
  useContext,
  useEffect,
  useState,
  createContext,
} from "react";
import { TCartData } from "../Types";
import { getAddToCartData } from "../utils/getLCData";

type TProviderValue = {
  cartData: TCartData[];
  setCartData: React.Dispatch<React.SetStateAction<TCartData[]>>;
  orderData: any;
  setOrderData: any;
  isLoadingAdditional: boolean;
  setIsLoadingAdditional: React.Dispatch<React.SetStateAction<boolean>>;
  totalCartProducts: number;
};

const AdditionalContext = createContext<TProviderValue | undefined>(undefined);

export const AdditionalContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [isLoadingAdditional, setIsLoadingAdditional] = useState(true);
  const [cartData, setCartData] = useState<TCartData[]>([]);
  const [totalCartProducts, setTotalCartProducts] = useState(0);
  const [orderData, setOrderData] = useState({});

  useEffect(() => {
    const handleUser = async () => {
      const result = getAddToCartData();
      setCartData(result);
      setTotalCartProducts(cartData.length ? cartData?.length : 0);
      setIsLoadingAdditional(false);
    };
    handleUser();
    setIsLoadingAdditional(false);
  }, [isLoadingAdditional, getAddToCartData]);

  const values: TProviderValue = {
    cartData,
    setCartData,
    isLoadingAdditional,
    setIsLoadingAdditional,
    totalCartProducts,
    orderData,
    setOrderData,
  };

  return (
    <AdditionalContext.Provider value={values}>
      {children}
    </AdditionalContext.Provider>
  );
};

export const useAdditional = () => {
  const context = useContext(AdditionalContext);
  if (context === undefined) {
    throw new Error(
      "useAdditional must be used within an AdditionalContextProvider"
    );
  }
  return context;
};
