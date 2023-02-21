import { useContext, useState } from 'react';
import { SidebarContext } from 'src/contexts/SidebarContext';
import { Box, Drawer, useTheme } from '@material-ui/core';
import SidebarMenu from './SidebarMenu';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Logo, NavListItem, Scrollbar, MuiConfirmModal } from 'src/components';
import { LogoutIcon } from 'src/Assets';
import { useNavigate } from 'react-router';
import useUserInfo from 'src/hooks/useUserInfo';
import { CONFIRM_MODAL } from 'src/Config/constant';
import { INITIAL_STATE } from 'src/contexts/UserContext';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { t } from 'i18next';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    minWidth: theme.sidebar.width,
    color: theme.Colors.white,
    zIndex: 7,
    height: '100%',
    position: 'fixed',
    backgroundColor: theme.Colors.whitePrimary,
    flexDirection: 'column',
    [theme.breakpoints.down('xs')]: {
      minWidth: 250
    }
  }
}));

const bottomRoutes = [
  {
    id: 10,
    name: 'Log out',
    path: '/admin/login',
    iconComponent: () => <LogoutIcon />
  }
];

function Sidebar() {
  const { sidebarToggle, toggleSidebar } = useContext(SidebarContext);
  const theme: Theme = useTheme();
  const styles = useStyles();
  const [confirmModal, setConfirmModal] = useState<any>({ open: false });
  const navigateTo = useNavigate();
  const { updateUserInfo } = useUserInfo();
  const { t, i18n } = useTranslation();

  const onClickNavItem = (event?: any) => {
    if (event?.target?.textContent !== 'Log out') {
      return;
    }
    const onConfirmClick = () => {
      localStorage.clear();
      navigateTo('/admin/login', { replace: true });
      updateUserInfo(INITIAL_STATE.userDetails);
      toast.success('User logged out successfully!');
    };

    const onCancelClick = () => {
      setConfirmModal({ open: false });
    };
    let props = {
      title: t('logout'),
      description: t('areYouSurewantLogout'),
      color: theme.Colors.redPrimary,
      iconType: CONFIRM_MODAL.logout
    };
    setConfirmModal({ open: true, onCancelClick, onConfirmClick, ...props });
  };
  const onDashBoard = () => {
    navigateTo('/admin/dashboard', { replace: true });
  };

  return (
    <>
      <Box
        className={styles.root}
        sx={{
          display: {
            xs: 'none',
            lg: 'flex'
          }
        }}
      >
        <Box py={4} px={7}>
          <Logo onClick={onDashBoard} />
        </Box>
        <Scrollbar>
          <SidebarMenu />
          <NavListItem
            routes={bottomRoutes}
            logOutTextColor={'red'}
            onClickNavItem={onClickNavItem}
          />
        </Scrollbar>
      </Box>
      <Drawer
        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
        open={sidebarToggle}
        onClose={toggleSidebar}
        variant="temporary"
        elevation={9}
      >
        <Box className={styles.root}>
          <Box
            sx={{
              py: 4,
              pl: { xs: 4, sm: 7, md: 7, lg: 7 }
            }}
          >
            <Logo onClick={onDashBoard} />
          </Box>
          <Scrollbar>
            <SidebarMenu />
            <NavListItem
              routes={bottomRoutes}
              logOutTextColor={'red'}
              containerStyles={{ mb: 14 }}
            />
          </Scrollbar>
        </Box>
      </Drawer>
      {confirmModal.open ? <MuiConfirmModal {...confirmModal} /> : null}
    </>
  );
}

export default Sidebar;
