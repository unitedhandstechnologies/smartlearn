import React, { useState, useEffect, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { Loader } from './components';
import { getToken, getUserId } from './Utils';

enum AUTH_STATE {
  NOT_LOGGED_ID,
  CHECKING,
  SIGNED_IN
}
interface Props {
  component?: React.ElementType;
  path?: string;
}
const PrivateRoute: React.FC<Props> = ({ component: Component, path }) => {
  const [authState, setAuthState] = useState(AUTH_STATE.SIGNED_IN);

  const fetchData = async () => {
    const isAuthenticated = getToken();
    const userId = getUserId();
    if (isAuthenticated !== null && userId !== null) {
      setAuthState(AUTH_STATE.SIGNED_IN);
    } else {
      setAuthState(AUTH_STATE.NOT_LOGGED_ID);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (authState === AUTH_STATE.CHECKING) {
    return <Loader />;
  }

  if (authState === AUTH_STATE.SIGNED_IN) {
    if (path) {
      return <Navigate to={path} />;
    } else {
      return <Component />;
    }
  } else {
    return <Navigate to="/admin/login" replace />;
  }
};
export default PrivateRoute;
