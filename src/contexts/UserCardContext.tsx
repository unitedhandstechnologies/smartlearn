import React, { useEffect, useState } from 'react';
import { HTTP_STATUSES } from 'src/Config/constant';
import useStudentInfo from 'src/hooks/useStudentInfo';
import { API_SERVICES } from 'src/Services';
import { CartProps } from 'src/Services/addToCartService';


export type CartInfo = {
  cartDetails: CartProps[];
  updateCartInfo: Awaited<(id?: number) => Promise<void>>;
};

export const INITIAL_STATE: CartInfo = {
cartDetails: [],
updateCartInfo: () => undefined
};

export const CartInfoContext = React.createContext({
  ...INITIAL_STATE
});

type Props = {
  children: any;
};

export const CartInfoProvider = ({ children }: Props) => {
  const [cartDetails, setCartDetails] = useState<CartProps[]>(
    INITIAL_STATE.cartDetails
  );

  const updateCartDetails = async (user_id: number) => {
    if (user_id === 0) {
      setCartDetails(INITIAL_STATE.cartDetails);
      return;
    }
    setCartDetails([]);
    const response: any = await API_SERVICES.AddToCartService.getAllAddToCart(
      user_id
    );
    if (response?.status < HTTP_STATUSES.BAD_REQUEST) {
      if (response?.data?.AddToCart?.length) {
        setCartDetails(response?.data?.AddToCart);
      }
    }
  };

  const contextValue = React.useMemo(() => {
    return {
      cartDetails: cartDetails,
      updateCartInfo: updateCartDetails
    };
  }, [cartDetails, updateCartDetails]);

  return (
    <CartInfoContext.Provider value={contextValue}>
      {children}
    </CartInfoContext.Provider>
  );
};