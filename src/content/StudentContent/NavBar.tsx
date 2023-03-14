import React, { useCallback, useContext, useEffect, useState } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Button,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  List,
  Drawer,
  Grid
} from '@mui/material';
import { useTheme, Badge } from '@material-ui/core';
import MenuIcon from '@mui/icons-material/Menu';
import logo from '../../Assets/Images/Logo.svg';
import { ButtonComp } from 'src/components';
import { Outlet, useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import { NavLink as RouterLink } from 'react-router-dom';
import CloseIcon from '@material-ui/icons/Close';
import UserCart from './HomePage/userNavBarBox/UserCart';
import CartPopover from './HomePage/userNavBarBox/CartPopup';
import NotificationPopover from './Courses/Notifications/StudentNotification';
import { CartImg } from 'src/Assets';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import useStudentInfo from 'src/hooks/useStudentInfo';
import useCartInfo from 'src/hooks/useCartInfo';
import { USER_TYPE_ID } from 'src/Config/constant';
import toast from 'react-hot-toast';
import { INITIAL_STATE } from 'src/contexts/StudentContext';
import avatar3 from '../../../src/Assets/Images/avatar3.svg';

const pages = [
  { label: 'Courses', path: 'courses' },
  { label: 'Workshops', path: 'workshops' },
  { label: 'Seminars/Webinars', path: 'seminars-webinars' },
  { label: 'Masterclasses', path: 'masterclasses' }
];

function NavBar() {
  const navigateTo = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [cartOpen, setCartOpen] = useState(null);
  const [bellOpen, setBellOpen] = useState(null);
  const { studentDetails, updateStudentInfo } = useStudentInfo();
  const { cartDetails } = useCartInfo();
  const [buttonValue, setButtonValue] = useState(-1);
  const theme = useTheme();

  const handleCartClick = (event) => {
    setCartOpen(event.currentTarget);
    setOpen(false);
  };
  const handleCartClose = () => {
    setCartOpen(null);
  };

  const handleBellClick = (event) => {
    setBellOpen(event.currentTarget);
    setOpen(false);
  };
  const handleBellClose = () => {
    setBellOpen(null);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = (index) => {
    setButtonValue(index);
    setOpen(false);
  };
  const loginNavigation = () => {
    navigateTo('/home/user-login');
    setOpen(false);
  };
  const profileNavigation = () => {
    navigateTo('/home/profile');
    setOpen(false);
  };
  const logoutProfile = () => {
    updateStudentInfo(INITIAL_STATE.studentDetails);
    localStorage.clear();
    navigateTo('/home');
    setOpen(false);
    toast.success('Profile Logout successfully');
  };
  const viewNotifications = () => {
    navigateTo('/home/view-notifications');
    setOpen(false);
  };

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          background: 'white',
          boxShadow: '0px 0px 10px 0px rgb(0 0 0 / 22%)'
        }}
      >
        <Toolbar>
          <Box
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' }
            }}
            component={Link}
            to={studentDetails.id === 0 ? '/' : '/home/profilehome'}
            onClick={() => setButtonValue(-1)}
          >
            <img
              src={logo}
              style={{
                height: 60,
                width: 200,
                mixBlendMode: 'multiply'
              }}
            />
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-haspopup="true"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: 'none' }) }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component={Link}
            to={studentDetails?.id === 0 ? '/' : '/home/profilehome'}
            onClick={() => setButtonValue(-1)}
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none'
            }}
          >
            <img
              src={logo}
              style={{
                height: 60,
                width: 200,
                mixBlendMode: 'multiply'
              }}
            />
          </Typography>
          <Box
            sx={{ flexGrow: 1, gap: 1, display: { xs: 'none', md: 'flex' } }}
          >
            {pages.map((item, index) => (
              <Button
                key={index}
                onClick={() => handleDrawerClose(index)}
                style={{
                  color: index === buttonValue ? '#78828C' : '#3C414B',
                  display: 'block',
                  textTransform: 'none',
                  fontFamily: 'Switzer',
                  fontWeight: 500,
                  fontSize: 16
                }}
                component={Link}
                to={item.path}
              >
                {index === buttonValue ? (
                  <span style={{ color: '#3C78F0' }}>/</span>
                ) : null}{' '}
                {item.label}
              </Button>
            ))}
          </Box>
          {/* {studentDetails.id === 0 && (
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                alignItems: 'center',
                gap: 1
              }}
            >
              <ButtonComp
                variant="outlined"
                btnWidth={78}
                height={40}
                buttonFontFamily="Switzer"
                buttonFontSize={theme.MetricsSizes.regular}
                backgroundColor={theme.Colors.white}
                buttonTextColor={'#3C78F0'}
                buttonText={'Login'}
                btnBorderRadius={4}
                onClickButton={() => navigateTo('/home/user-login')}
              />
              <Box sx={{ display: { xs: 'none', lg: 'flex' } }}>
                <ButtonComp
                  btnWidth={240}
                  height={40}
                  buttonFontFamily="Switzer"
                  buttonFontSize={theme.MetricsSizes.small_xxx}
                  backgroundColor={'#3C78F0'}
                  buttonTextColor={theme.Colors.white}
                  btnBorderRadius={4}
                  buttonText={'Start learning for free'}
                  onClickButton={() => navigateTo('/home/user-login')}
                />
              </Box>
            </Box>
          )} */}
          {studentDetails?.id !== 0 &&
          studentDetails?.user_type === USER_TYPE_ID.student ? (
            <>
              <Grid
                sx={{
                  [theme.breakpoints.down('sm')]: { display: 'flex' },
                  [theme.breakpoints.between('lg', 'xl')]: { display: 'none' },
                  [theme.breakpoints.between('md', 'lg')]: { display: 'none' }
                }}
              >
                {studentDetails?.user_type === USER_TYPE_ID.student ? (
                  <IconButton aria-label="cart" onClick={handleCartClick}>
                    <Badge badgeContent={cartDetails?.length} color="secondary">
                      <img src={CartImg} width={25} height={25} />
                    </Badge>
                  </IconButton>
                ) : null}
              </Grid>
              <Box
                sx={{
                  [theme.breakpoints.down('sm')]: { display: 'none' }
                }}
              >
                <UserCart
                  userName={
                    studentDetails?.first_name + ' ' + studentDetails?.last_name
                  }
                  image={studentDetails?.image_url}
                  addToCart={cartDetails}
                />
              </Box>
            </>
          ) : (
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                alignItems: 'center',
                gap: 1
              }}
            >
              <ButtonComp
                variant="outlined"
                btnWidth={78}
                height={40}
                buttonFontFamily="Switzer"
                buttonFontSize={theme.MetricsSizes.regular}
                backgroundColor={theme.Colors.white}
                buttonTextColor={'#3C78F0'}
                buttonText={'Login'}
                btnBorderRadius={4}
                onClickButton={() => navigateTo('/home/user-login')}
              />
              <Box sx={{ display: { xs: 'none', lg: 'flex' } }}>
                <ButtonComp
                  btnWidth={240}
                  height={40}
                  buttonFontFamily="Switzer"
                  buttonFontSize={theme.MetricsSizes.regular}
                  backgroundColor={'#3C78F0'}
                  buttonTextColor={theme.Colors.white}
                  btnBorderRadius={4}
                  buttonText={'Start learning for free'}
                  onClickButton={() => navigateTo('/home/user-login')}
                />
              </Box>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: 350,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 350,
            boxSizing: 'border-box'
          }
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <Grid
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: theme.spacing(0, 1),
            ...theme.mixins.toolbar,
            justifyContent: 'space-between'
          }}
        >
          <Box component={Link} to={'/'}>
            <img
              src={logo}
              style={{
                height: 60,
                width: 200,
                mixBlendMode: 'multiply'
              }}
            />
          </Box>
          <IconButton onClick={handleDrawerClose}>
            {<CloseIcon fontSize="medium" style={{ cursor: 'pointer' }} />}
          </IconButton>
        </Grid>
        <Divider />
        <List>
          {pages?.map((item, index) => (
            <ListItem key={index} component={RouterLink} to={item.path}>
              <ListItemButton>
                <ListItemText
                  onClick={handleDrawerClose}
                  primary={item?.label}
                />
              </ListItemButton>
            </ListItem>
          ))}
          {studentDetails?.id !== 0 &&
          studentDetails?.user_type === USER_TYPE_ID.student ? (
            <>
              <Divider
                variant="middle"
                sx={{ margin: 2, backgroundColor: '#3C78F0', width: 200 }}
              />
              <Button
                //onClick={profileNavigation}
                style={{
                  display: 'block',
                  textTransform: 'none',
                  fontFamily: 'Switzer',
                  fontWeight: 500,
                  fontSize: 16,
                  paddingLeft: 35,
                  color: '#3C414B'
                }}
              >
                <img
                  src={
                    studentDetails?.image_url
                      ? studentDetails?.image_url
                      : avatar3
                  }
                  style={{
                    marginRight: 10,
                    width: 30,
                    height: 30,
                    borderRadius: '50% '
                  }}
                />
                {`${studentDetails?.first_name} ${studentDetails?.last_name}`}
              </Button>

              <Button
                onClick={profileNavigation}
                style={{
                  //color: index === buttonValue ? '#78828C' : '#3C414B',
                  display: 'block',
                  textTransform: 'none',
                  fontFamily: 'Switzer',
                  fontWeight: 500,
                  fontSize: 16,
                  paddingTop: 10,
                  paddingLeft: 35
                }}
              >
                {`Profile`}
              </Button>
              {/* <Button
                style={{
                  display: 'block',
                  textTransform: 'none',
                  fontFamily: 'Switzer',
                  fontWeight: 500,
                  fontSize: 16,
                  paddingLeft: 35
                }}
                onClick={handleCartClick}
              >
                {'Cart'}
              </Button> */}

              <Button
                style={{
                  display: 'block',
                  textTransform: 'none',
                  fontFamily: 'Switzer',
                  fontWeight: 500,
                  fontSize: 16,
                  paddingLeft: 35
                }}
                onClick={viewNotifications}
              >
                {'Notification'}
              </Button>
              <Divider
                variant="middle"
                sx={{ margin: 1, backgroundColor: '#3C78F0', width: 200 }}
              />
              <Button
                onClick={logoutProfile}
                style={{
                  //color: index === buttonValue ? '#78828C' : '#3C414B',
                  display: 'block',
                  textTransform: 'none',
                  fontFamily: 'Switzer',
                  fontWeight: 500,
                  fontSize: 16,
                  paddingLeft: 35,
                  color: 'red'
                }}
              >
                {'Logout'}
              </Button>
              <NotificationPopover
                notifications={notifications}
                anchorEl={bellOpen}
                handleClose={handleBellClose}
              />
            </>
          ) : (
            <Box
              sx={{
                padding: theme.spacing(0, 1.5)
              }}
            >
              <ListItemButton>
                <ButtonComp
                  variant="outlined"
                  btnWidth={78}
                  height={40}
                  buttonFontFamily="Switzer"
                  buttonFontSize={theme.MetricsSizes.regular}
                  backgroundColor={theme.Colors.white}
                  buttonTextColor={'#3C78F0'}
                  buttonText={'Login'}
                  onClickButton={loginNavigation}
                />
              </ListItemButton>
              <ListItemButton>
                <ButtonComp
                  btnWidth={240}
                  height={40}
                  buttonFontFamily="Switzer"
                  buttonFontSize={theme.MetricsSizes.small_xxx}
                  backgroundColor={'#3C78F0'}
                  buttonTextColor={theme.Colors.white}
                  buttonText={'Start learning for free'}
                  onClickButton={loginNavigation}
                />
              </ListItemButton>
              {/* <ListItemButton>
                <ButtonComp
                  variant="outlined"
                  btnWidth={240}
                  height={40}
                  buttonFontFamily="Switzer"
                  buttonFontSize={theme.MetricsSizes.small_xxx}
                  buttonTextColor={'#3C78F0'}
                  style={{ background: 'none' }}
                  btnBorderRadius={4}
                  buttonText={'Carts'}
                  onClick={handleCartClick}
                  iconImage={
                    <img src={CartImg} width={'17.92px'} height={'17.24px'} />
                  }
                />
              </ListItemButton>
              <ListItemButton>
                <ButtonComp
                  variant="outlined"
                  btnWidth={240}
                  height={40}
                  buttonFontFamily="Switzer"
                  buttonFontSize={theme.MetricsSizes.small_xxx}
                  buttonTextColor={'#3C78F0'}
                  buttonText={'Notification'}
                  btnBorderRadius={4}
                  onClick={handleBellClick}
                  style={{ background: 'none' }}
                  iconImage={<NotificationsNoneIcon />}
                />
              </ListItemButton> */}
              {/* <CartPopover
                carts={cartDetails}
                anchorEl={cartOpen}
                handleClose={handleCartClose}
              />
              <NotificationPopover
                notifications={notifications}
                anchorEl={bellOpen}
                handleClose={handleBellClose}
              /> */}
            </Box>
          )}
        </List>
      </Drawer>
      {studentDetails?.user_type === USER_TYPE_ID.student ? (
        <CartPopover
          carts={cartDetails}
          anchorEl={cartOpen}
          handleClose={handleCartClose}
        />
      ) : null}
      <Box>
        <Outlet />
      </Box>
      <Footer />
    </>
  );
}
export default NavBar;

const notifications = [
  {
    title: 'Congratulations! you earned a certificate',
    content:
      'You just completed a course “Basics of options trading”. Tap  to view your certificate.'
  },
  {
    title: 'Password changed',
    content: 'Password for your account has been changed recently.'
  },
  {
    title: 'Upcoming workshop alert',
    content: 'You have a workshop to attend tomorrow. Tap to view the details'
  },
  {
    title: 'Upcoming workshop alert',
    content: 'You have a workshop to attend tomorrow. Tap to view the details'
  }
];
