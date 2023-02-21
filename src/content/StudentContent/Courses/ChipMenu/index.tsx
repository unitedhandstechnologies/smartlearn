import { Grid, MenuItem, Typography, Menu } from '@material-ui/core';
import Checkbox from '@mui/material/Checkbox';
import { ButtonComp } from 'src/components';
import IconTextComp from 'src/components/IconTextComp';

type Props = {
  anchorEl: Element | null;
  menuItem: any[];
  headerName?: string;
  handleClose: () => void;
  handleChange?: () => void;
  handleApply?: () => void;
  onClick?: (event: any) => void;
};

const ChipMenu = ({
  anchorEl,
  menuItem = [],
  headerName,
  handleChange,
  currentId,
  handleClose,
  handleApply
}) => {

  const getMenuItems = () => {
    return menuItem?.length
      ? menuItem.map((item, index) => {
          return (
            <MenuItem key={index}>
              <Grid container style={{ gap: 10, alignItems: 'center' }}>
                <Grid item>
                  <Checkbox
                    checked={
                      index === currentId
                        ? true
                        : false
                    }
                    name={item.label}
                    onClick={() => handleChange(index)}
                  />
                </Grid>
                <Grid item xs>
                  <IconTextComp
                    icon={item.icon || null}
                    value={item.label}
                    valueColor={'#3C414B'}
                  />
                </Grid>
              </Grid>
            </MenuItem>
          );
        })
      : null;
  };

  return (
    <Menu
      id="menu-appbar"
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right'
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
    >
      <Typography
        style={{
          fontFamily: 'Switzer',
          fontSize: '14px',
          fontWeight: 400,
          color: '#78828C',
          marginLeft: 15
        }}
      >
        {headerName}
      </Typography>
      {getMenuItems()}
      <ButtonComp
        variant={'outlined'}
        buttonText={'Apply'}
        buttonTextColor={'#3C78F0'}
        buttonFontFamily={'Switzer'}
        height={40}
        btnBorderRadius={4}
        style={{
          background: 'white',
          borderColor: '#3C78F0',
          marginLeft: 22,
          marginTop: 5,
          width: '78%'
        }}
        onClick={() => handleApply()}
      />
    </Menu>
  );
};

export default ChipMenu;
