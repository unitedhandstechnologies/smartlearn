import React from 'react';
import { Menu, MenuItem } from '@material-ui/core';

type Prop = {
  disabled?: boolean;
  renderIcon?: () => React.ReactNode;
  text: string;
  onClick: (val?: any) => void;
};

type RowActionProp = {
  open: boolean;
  selectedActionRow: any;
  rowActions: Prop[];
  handleClose: () => void;
  anchorEl: null | HTMLElement;
};
const MenuActionComp = (props: RowActionProp) => {
  const { open, selectedActionRow, rowActions, handleClose, anchorEl } = props;

  return (
    <div>
      <Menu
        anchorEl={anchorEl}
        onClose={handleClose}
        open={open}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
      >
        {rowActions.map((action, index) => {
          return (
            <MenuItem
              disabled={action.disabled}
              onClick={() => action.onClick(selectedActionRow)}
              key={index}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px'
                }}
              >
                {action.renderIcon && (
                  <div style={{ display: 'flex' }}>{action.renderIcon()}</div>
                )}
                {action.text}
              </div>
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
};

export default MenuActionComp;
