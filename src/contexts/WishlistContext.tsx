import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  DETECT_LANGUAGE,
  HTTP_STATUSES,
  USER_TYPES
} from 'src/Config/constant';
import useStudentInfo from 'src/hooks/useStudentInfo';
import { API_SERVICES } from 'src/Services';
import { CartProps } from 'src/Services/addToCartService';

type WishlistProps = {
  id: number;
  course_type: string;
  meeting_location: string;
  course_name: string;
  course_id: number;
  language_id: number;
  user_id: number;
};
export type WishlistInfo = {
  wishlistDetails: WishlistProps[];
  updateWishlistInfo: Awaited<
    (id?: number, language_id?: number) => Promise<void>
  >;
};

export const INITIAL_STATE: WishlistInfo = {
  wishlistDetails: [],
  updateWishlistInfo: () => undefined
};

export const WishlistInfoContext = React.createContext({
  ...INITIAL_STATE
});

type Props = {
  children: any;
};

export const WishlistInfoProvider = ({ children }: Props) => {
  const { studentDetails } = useStudentInfo();
  const { i18n } = useTranslation();
  const [wishlistDetails, setWishlistDetails] = useState<WishlistProps[]>(
    INITIAL_STATE.wishlistDetails
  );

  const updateWishlistDetails = async (
    user_id: number,
    language_id: number
  ) => {
    if (user_id === 0 && USER_TYPES.student === studentDetails.user_type) {
      setWishlistDetails(INITIAL_STATE.wishlistDetails);
      return;
    }
    setWishlistDetails([]);
    const response: any = await API_SERVICES.WishListService.getAllWishlist(
      user_id,
      language_id
    );
    if (response?.status < HTTP_STATUSES.BAD_REQUEST) {
      if (response?.data?.wishList?.length) {
        console.log('updateWiahlistInfo', response?.data?.wishList);
        setWishlistDetails(response?.data?.wishList);
      }
    }
  };

  const contextValue = React.useMemo(() => {
    return {
      wishlistDetails: wishlistDetails,
      updateWishlistInfo: updateWishlistDetails
    };
  }, [wishlistDetails, updateWishlistDetails]);

  return (
    <WishlistInfoContext.Provider value={contextValue}>
      {children}
    </WishlistInfoContext.Provider>
  );
};
