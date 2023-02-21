import { Badge, Grid, Typography, Box } from '@material-ui/core';
import {
  CartImg,
  UserProfile,
  BellImg,
  MenuProfileImg,
  WishListImg,
  LogOutImg
} from 'src/Assets';
import IconButton from '@mui/material/IconButton';
import { Divider } from '@mui/material';
import React, { useState } from 'react';
import CartPopover from './CartPopup';
import NotificationPopover from '../../Courses/Notifications/StudentNotification';
import { ButtonComp } from 'src/components';
import ProfileMenu from './ProfileMenu';
import IconTextComp from 'src/components/IconTextComp';

type Props = {
  userName?: string;
  badgeContent?: number;
};

const UserCart = (props: Props) => {
  const { userName, badgeContent } = props;
  const [cartOpen, setCartOpen] = useState(null);
  const [bellOpen, setBellOpen] = useState(null);
  const [profileOpen, setProfileOpen] = useState(null);

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
          valueColor={`${index === 2 ? '#78828C' : '#3C414B'}`}
        />
        {index === 1 ? <Divider style={{ paddingTop: 10 }} /> : null}
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
        width: 'fit-content'
      }}
    >
      <Grid>
        <IconButton aria-label="cart" onClick={handleCartClick}>
          <Badge badgeContent={badgeContent || 4} color="secondary">
            <img src={CartImg} width={'23.92px'} height={'24.24px'} />
          </Badge>
        </IconButton>
      </Grid>
      <Grid style={{ paddingLeft: 8 }}>
        <IconButton aria-label="profile" onClick={handleProfileClick}>
          <img src={UserProfile} width={'32px'} height={'32px'} />{' '}
        </IconButton>
      </Grid>
      <Grid>
        <Typography
          style={{
            fontSize: '16px',
            fontWeight: 400,
            color: '#3C414B'
          }}
        >
          {userName || 'Cameron'}
        </Typography>
      </Grid>
      <Divider orientation="vertical" style={{ width: 15, height: 35 }} />
      <Grid style={{ paddingLeft: 2 }}>
        <IconButton aria-label="Bell" onClick={handleBellClick}>
          <img src={BellImg} width={'23.33px'} height={'24.5px'} />
        </IconButton>
      </Grid>
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
      <ProfileMenu
        menuItems={items}
        anchorEl={profileOpen}
        handleClose={handleProfileClose}
        renderMenuItems={renderMenuContent}
      />
    </Grid>
  );
};

export default UserCart;

const items = [
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
