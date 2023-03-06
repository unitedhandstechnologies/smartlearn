import React, { useContext } from 'react';
import { WishlistInfoContext } from 'src/contexts/WishlistContext';

const useWishliatInfo = () => {
  const wishlistData = useContext(WishlistInfoContext);
  return wishlistData;
};

export default useWishliatInfo;
