import React from 'react';
import { Typography } from '@material-ui/core';
import useUserInfo from './hooks/useUserInfo';

interface Props {
  component: React.ElementType;
  permissionId: number;
}
const PermissionRoute: React.FC<Props> = ({
  component: Component,
  permissionId
}) => {
  const { userDetails } = useUserInfo();

  if (userDetails?.permissions?.includes(permissionId)) {
    return <Component />;
  } else {
    return <Typography variant="h3"> Access Denied!</Typography>;
  }
};

export default PermissionRoute;
