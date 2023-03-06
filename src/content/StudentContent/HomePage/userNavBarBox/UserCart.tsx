import {
  Badge,
  Grid,
  Typography,
  Box,
  Avatar,
  useTheme
} from '@material-ui/core';
import {
  CartImg,
  UserProfile,
  BellImg,
  MenuProfileImg,
  WishListImg,
  LogOutImg,
  ArrowNext
} from 'src/Assets';
import IconButton from '@mui/material/IconButton';
import { Divider } from '@mui/material';
import React, { useState } from 'react';
import CartPopover from './CartPopup';
import NotificationPopover from '../../Courses/Notifications/StudentNotification';
import { ButtonComp } from 'src/components';
import ProfileMenu from './ProfileMenu';
import IconTextComp from 'src/components/IconTextComp';
import HomeIcon from '../../../../Assets/Images/HomeIcon.svg';
import contactUs from '../../../../Assets/Images/contactUs.svg';
import { USER_TYPES } from 'src/Config/constant';

type Props = {
  userName?: string;
  badgeContent?: number;
  image?: string;
  userType?: number;
  addToCart?: any[];
};

const UserCart = (props: Props) => {
  const { userName, badgeContent, image, userType, addToCart } = props;
  const [cartOpen, setCartOpen] = useState(null);
  const [bellOpen, setBellOpen] = useState(null);
  const [profileOpen, setProfileOpen] = useState(null);
  const theme = useTheme();

  const handleCartClick = (event) => {
    setCartOpen(event.currentTarget);
  };
  const handleCartClose = () => {
    setCartOpen(null);
  };

  const handleProfileClick = (event) => {
    setProfileOpen(event.currentTarget);
  };
  const handleProfileClose = () => {
    setProfileOpen(null);
  };

  const handleBellClick = (event) => {
    setBellOpen(event.currentTarget);
  };
  const handleBellClose = () => {
    setBellOpen(null);
  };

  const renderMenuContent = (item, index) => {
    return (
      <Grid>
        <IconTextComp
          icon={item.icon || null}
          value={item.name}
          //valueColor={`${index === 2 ? '#78828C' : '#3C414B'}`}
        />
        {userType === USER_TYPES.mentor ? (
          index === 1 ? (
            <Divider variant="middle" sx={{ marginTop: 2 }} />
          ) : null
        ) : index === 2 ? (
          <Divider sx={{ marginTop: 2 }} />
        ) : null}
      </Grid>
    );
  };

  return (
    <Grid
      container
      style={{
        gap: 5,
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: 'fit-content',
        [theme.breakpoints.down('sm')]: {
          display: 'none'
        }
      }}
    >
      <Grid>
        {userType === USER_TYPES.mentor ? null : (
          <IconButton aria-label="cart" onClick={handleCartClick}>
            <Badge
              badgeContent={badgeContent || addToCart?.length}
              color="secondary"
            >
              <img src={CartImg} width={25} height={25} />
            </Badge>
          </IconButton>
        )}
      </Grid>
      <Grid style={{ paddingLeft: 8 }}>
        <IconButton aria-label="profile" onClick={handleProfileClick}>
          {/* <img src={image || UserProfile} width={'32px'} height={'32px'} />{' '} */}
          <Avatar
            alt=""
            src={image}
            style={{ width: '32px', height: '32px' }}
          />
        </IconButton>
      </Grid>
      <Grid>
        <Typography
          style={{
            fontSize: '16px',
            fontWeight: 400,
            color: '#3C414B',
            padding: 4
          }}
        >
          {userName}
        </Typography>
      </Grid>
      <Divider orientation="vertical" style={{ width: 1, height: 30 }} />
      <Grid style={{ paddingLeft: 2 }}>
        <IconButton aria-label="Bell" onClick={handleBellClick}>
          <img src={BellImg} width={'23.33px'} height={'24.5px'} />
        </IconButton>
      </Grid>

      {userType === USER_TYPES.mentor ? null : (
        <CartPopover
          carts={addToCart}
          anchorEl={cartOpen}
          handleClose={handleCartClose}
        />
      )}

      <NotificationPopover
        notifications={notifications}
        anchorEl={bellOpen}
        handleClose={handleBellClose}
      />
      <ProfileMenu
        menuItems={userType === USER_TYPES.mentor ? itemsMentor : items}
        anchorEl={profileOpen}
        handleClose={handleProfileClose}
        renderMenuItems={renderMenuContent}
        userType={userType}
      />
    </Grid>
  );
};

export default UserCart;

const items = [
  {
    name: 'Home',
    icon: HomeIcon
  },
  {
    name: 'Profile',
    icon: MenuProfileImg
  },
  {
    name: 'Your wishlist',
    icon: WishListImg
  },
  {
    name: 'Logout',
    icon: LogOutImg
  }
];
const itemsMentor = [
  {
    name: 'Go to SmartLearn',
    icon: ArrowNext
  },
  {
    name: 'Contact us',
    icon: contactUs
  },
  {
    name: 'Logout',
    icon: LogOutImg
  }
];

export const notifications = [
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

export const carts = [
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
