import React, { useContext, useState } from 'react';
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
  Drawer
} from '@mui/material';
import { useTheme } from '@material-ui/core/styles';
import MenuIcon from '@mui/icons-material/Menu';
import logo from '../../Assets/Images/Logo.svg';
import { ButtonComp } from 'src/components';
import { Outlet, useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import { Grid } from '@material-ui/core';
import { NavLink as RouterLink } from 'react-router-dom';
import CloseIcon from '@material-ui/icons/Close';
import UserCart from './HomePage/userNavBarBox/UserCart';
import CartPopover from './HomePage/userNavBarBox/CartPopup';
import NotificationPopover from './Courses/Notifications/StudentNotification';
import { CartImg } from 'src/Assets';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import useStudentInfo from 'src/hooks/useStudentInfo';

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

  const handleCartClick = (event) => {
    setCartOpen(event.currentTarget);
  };
  const handleCartClose = () => {
    setCartOpen(null);
  };

  const handleBellClick = (event) => {
    setBellOpen(event.currentTarget);
  };
  const handleBellClose = () => {
    setBellOpen(null);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const theme = useTheme();
  return (
    <>
      <AppBar position="sticky" sx={{ background: 'white', boxShadow: 'none' }}>
        <Toolbar>
          <Box
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' }
            }}
            component={Link}
            to={'/'}
          >
            <img
              src={logo}
              style={{
                height: 60,
                width: 200
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
            to={'/'}
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
                width: 200
              }}
            />
          </Typography>
          <Box
            sx={{ flexGrow: 1, gap: 1, display: { xs: 'none', md: 'flex' } }}
          >
            {pages.map((item, index) => (
              <Button
                key={index}
                onClick={handleDrawerClose}
                sx={{
                  color: ' #3C414B',
                  display: 'block',
                  textTransform: 'none',
                  fontFamily: 'Switzer',
                  fontWeight: 500,
                  fontSize: 16
                }}
                component={Link}
                to={item.path}
              >
                {item.label}
              </Button>
            ))}
          </Box>
          {studentDetails.id === 0 && (
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
                  onClickButton={() => {}}
                />
              </Box>
            </Box>
          )}
          {studentDetails.id !== 0 && (
            <UserCart
              userName={studentDetails.user_name}
              image={studentDetails.image_url}
            />
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
                width: 200
              }}
            />
          </Box>
          <IconButton onClick={handleDrawerClose}>
            {<CloseIcon fontSize="medium" style={{ cursor: 'pointer' }} />}
          </IconButton>
        </Grid>
        <Divider />
        <List>
          {pages.map((item, index) => (
            <ListItem key={index} component={RouterLink} to={item.path}>
              <ListItemButton>
                <ListItemText
                  onClick={handleDrawerClose}
                  primary={item.label}
                />
              </ListItemButton>
            </ListItem>
          ))}
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
                onClickButton={() => navigateTo('/home/user-login')}
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
                onClickButton={() => {}}
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
            </ListItemButton>
            <CartPopover
              carts={carts}
              anchorEl={cartOpen}
              handleClose={handleCartClose}
            />
            <NotificationPopover
              notifications={notifications}
              anchorEl={bellOpen}
              handleClose={handleBellClose}
            />
          </Box>
        </List>
      </Drawer>
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

const carts = [
  {
    courserType: 'Course',
    amount: 4500,
    courseName: 'Basics of Stock Market investments',
    availableSeat: 2
  },
  {
    courserType: 'Worshop',
    amount: 4500,
    courseName: 'Basics of Stock Market investments',
    availableSeat: 2
  }
];
