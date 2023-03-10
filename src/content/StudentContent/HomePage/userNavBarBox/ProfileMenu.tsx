import { MenuItem, Menu, Grid } from '@material-ui/core';

const handleClick = (event) => {
  console.log(event.target, "event");
};

type Props = {
  anchorEl: Element | null;
  aboveMenuItemContent?: () => void;
  menuItems: any[];
  renderMenuItems?: (item,index) =>  React.ReactNode,
  belowMenuItemContent?: () => void;
  headerName?: string;
  handleClose: () => void;
  onClick?: (event: any) => void;
};

const ProfileMenu = (props: Props) => {
  const {
    anchorEl,
    aboveMenuItemContent,
    menuItems = [],
    renderMenuItems,
    belowMenuItemContent,
    handleClose
  } = props;
  const getMenuItems = () => {
    return (
      <Grid>
        {aboveMenuItemContent && aboveMenuItemContent()}
        {menuItems.map((item, index) => {
          return (
            <MenuItem key={index} onClick={(event) => handleClick(event)}>
              {renderMenuItems(item,index)}
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
      PaperProps={{style:{
        padding:2
      }}}
    >
      {getMenuItems()}
    </Menu>
  );
};

export default ProfileMenu;
