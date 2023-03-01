import { MenuItem, Menu, Grid } from '@material-ui/core';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { USER_TYPES } from 'src/Config/constant';
import { INITIAL_STATE } from 'src/contexts/StudentContext';

import useStudentInfo from 'src/hooks/useStudentInfo';

const handleClick = (event) => {
  console.log(event.target, 'event');
};

type Props = {
  anchorEl: Element | null;
  aboveMenuItemContent?: () => void;
  menuItems: any[];
  renderMenuItems?: (item, index) => React.ReactNode;
  belowMenuItemContent?: () => void;
  headerName?: string;
  handleClose: () => void;
  onClick?: (event: any) => void;
  userType?: number;
};

const ProfileMenu = (props: Props) => {
  const {
    anchorEl,
    aboveMenuItemContent,
    menuItems = [],
    renderMenuItems,
    belowMenuItemContent,
    handleClose,
    userType
  } = props;
  const navigateTo = useNavigate();
  const { updateStudentInfo } = useStudentInfo();
  const handleClick = (event) => {
    console.log(event.target.innerText, 'event');
    if (userType === USER_TYPES.mentor) {
      if (event.target.innerText === 'Go to SmartLearn') {
        navigateTo('/home');
        handleClose();
      } else if (event.target.innerText === 'Contact us') {
        navigateTo('/home');
        handleClose();
      } else if (event.target.innerText === 'Logout') {
        updateStudentInfo(INITIAL_STATE.studentDetails);
        localStorage.clear();
        navigateTo('/home');
        handleClose();
        toast.success('Profile Logout successfully');
      }
    } else {
      if (event.target.innerText === 'Home') {
        navigateTo('/home/profilehome');
        handleClose();
      } else if (event.target.innerText === 'Profile') {
        navigateTo('/home/profile');
        handleClose();
      } else if (event.target.innerText === 'Your wishlist') {
        handleClose();
      } else if (event.target.innerText === 'Logout') {
        updateStudentInfo(INITIAL_STATE.studentDetails);
        localStorage.clear();
        navigateTo('/home');
        handleClose();
        toast.success('Profile Logout successfully');
      }
    }
  };
  const getMenuItems = () => {
    return (
      <Grid>
        {aboveMenuItemContent && aboveMenuItemContent()}
        {menuItems.map((item, index) => {
          return (
            <MenuItem key={index} onClick={(event) => handleClick(event)}>
              {renderMenuItems(item, index)}
            </MenuItem>
          );
        })}
        {belowMenuItemContent && belowMenuItemContent()}
      </Grid>
    );
  };

  return (
    <Menu
      id="menu-appbar"
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left'
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left'
      }}
      open={Boolean(anchorEl)}
      getContentAnchorEl={null}
      onClose={handleClose}
      elevation={0}
      PaperProps={{
        style: {
          padding: 2
        }
      }}
    >
      {getMenuItems()}
    </Menu>
  );
};

export default ProfileMenu;
