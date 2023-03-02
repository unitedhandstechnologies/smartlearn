import React, { useContext } from 'react';
import { CartInfoContext } from 'src/contexts/UserCardContext';


const useCartInfo = () => {
  const cartData = useContext(CartInfoContext);
  return cartData;
};

export default useCartInfo;