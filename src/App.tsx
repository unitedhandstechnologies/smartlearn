import { CssBaseline } from '@material-ui/core';
import ThemeProvider from './theme/ThemeProvider';
import toast, { Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { HTTP_STATUSES } from './Config/constant';
import { getToken, getUserId } from './Utils';
import { API_SERVICES } from './Services';
import { Loader } from './components';
import useUserInfo from './hooks/useUserInfo';
import { useTranslation } from 'react-i18next';
import Routes from './Routes';

enum AUTH_STATE {
  NOT_LOGGED_ID,
  CHECKING,
  SIGNED_IN
}

function App() {
  const [authState, setAuthState] = useState(AUTH_STATE.CHECKING);
  const { updateUserInfo } = useUserInfo();
  const { t } = useTranslation();

  const fetchData = async () => {
    try {
      const isAuthenticated = getToken();
      const userId = getUserId();
      if (isAuthenticated !== null && userId !== null) {
        const response: any = await API_SERVICES.adminUserService.getById(
          userId
        );
        if (response?.status < HTTP_STATUSES.BAD_REQUEST) {
          updateUserInfo((prevState) => {
            return { ...prevState, ...response?.data?.user };
          });
          setAuthState(AUTH_STATE.SIGNED_IN);
        } else {
          setAuthState(AUTH_STATE.NOT_LOGGED_ID);
        }
      } else {
        setAuthState(AUTH_STATE.NOT_LOGGED_ID);
      }
    } catch (err) {
      toast.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [t]);

  if (authState === AUTH_STATE.CHECKING) {
    return <Loader />;
  }

  return (
    <ThemeProvider>
      <CssBaseline />
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            padding: '10px',
            color: '#FFFF',
            fontSize: 15
          },
          success: {
            style: {
              background: 'green'
            },
            duration: 2000
          },
          error: {
            style: {
              background: 'red'
            },
            duration: 2000
          }
        }}
      />
      <Routes />
    </ThemeProvider>
  );
}
export default App;
