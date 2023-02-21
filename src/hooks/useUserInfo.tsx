import React, { useContext } from 'react';
import { UserInfoContext } from 'src/contexts/UserContext';

const useUserInfo = () => {
  const userData = useContext(UserInfoContext);
  return userData;
};

export default useUserInfo;
