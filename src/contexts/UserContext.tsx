import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { HTTP_STATUSES } from 'src/Config/constant';
import { API_SERVICES } from 'src/Services';
import { getUserId } from 'src/Utils';

export type UserDetails = {
  id: number;
  first_name: string;
  last_name: string;
  phone_number: string;
  social_information_url: string;
  user_type: number;
  status_id: number;
  user_name: string;
  password: string;
  created_at: string;
  updated_at: string;
  permissions: number[];
  image_url: string;
};

export type UserInfo = {
  userDetails: UserDetails;
  updateUserInfo: React.Dispatch<React.SetStateAction<UserDetails>>;
};

export const INITIAL_STATE: UserInfo = {
  userDetails: {
    id: 0,
    first_name: '',
    last_name: '',
    phone_number: '',
    social_information_url: '',
    image_url: '',
    user_type: 0,
    status_id: 0,
    user_name: '',
    password: '',
    created_at: '',
    updated_at: '',
    permissions: []
  },
  updateUserInfo: () => undefined
};

export const UserInfoContext = React.createContext({
  ...INITIAL_STATE
});

type Props = {
  children: any;
};

export const UserInfoProvider = ({ children }: Props) => {
  const [userDetails, setUserDetails] = useState<UserDetails>(
    INITIAL_STATE.userDetails
  );
  const fetchData = async () => {
    const userId = getUserId();
    try {
      if (userId !== null) {
        const getUserRes: any = await API_SERVICES.adminUserService.getById(
          userId
        );

        if (getUserRes?.status < HTTP_STATUSES.BAD_REQUEST) {
          setUserDetails((prevState) => {
            return { ...prevState, ...getUserRes?.data?.user };
          });
        }
      }
    } catch (err) {
      toast.error(err?.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const contextValue = React.useMemo(() => {
    return {
      userDetails: userDetails,
      updateUserInfo: setUserDetails
    };
  }, [userDetails, setUserDetails]);

  return (
    <UserInfoContext.Provider value={contextValue}>
      {children}
    </UserInfoContext.Provider>
  );
};
