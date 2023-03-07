import React, { useContext } from 'react';
import { WishlistInfoContext } from 'src/contexts/WishlistContext';

const useWishlistInfo = () => {
  const wishlistData = useContext(WishlistInfoContext);
  return wishlistData;
};

export default useWishlistInfo;
