import { useContext, useMemo, useState } from 'react';
import {
  Box,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core';
import { NavLink as RouterLink } from 'react-router-dom';
import { SidebarContext } from 'src/contexts/SidebarContext';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import {
  EnrollmentManagementIcon,
  InstructorManagementIcon,
  DashboardReportIcon,
  StudentsAdministrationIcon,
  AdminManagementIcon,
  CategoryManagementIcon,
  CourseManagementIcon,
  ReportsIcon,
  SettingsIcon
} from 'src/Assets/Images';
import { UserInfoContext } from 'src/contexts/UserContext';

type StyleProps = {
  logOutTextColor: string;
};
const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
  listItem: {
    '& > div': {
      '& > svg , path': {
        fill: theme.Colors.navBlue
      },
      color: theme.Colors.navBlue
    },
    '&:active, &.active, &.Mui-selected': {
      transition: 'all 0.1s ease-out',
      background: theme.Colors.primary,
      '& > div:first-child': {
        background: theme.Colors.mediumGreen,
        borderRadius: ' 0px 24px 24px 0px'
      },
      '& > div': {
        '& > svg , path': {
          fill: theme.Colors.white
        },
        color: theme.Colors.white
      }
    }
  },
  listItemLogout: {
    '& > div': {
      '& > svg , path': {
        fill: (props) =>
          props.logOutTextColor ? props.logOutTextColor : theme.Colors.navBlue
      },
      color: (props) =>
        props.logOutTextColor ? props.logOutTextColor : theme.Colors.navBlue
    },
    '&:active, &.active, &.Mui-selected': {
      background: theme.Colors.primary,
      '& > div': {
        '& > svg , path': {
          fill: theme.Colors.white
        },
        color: theme.Colors.white
      }
    }
  },
  ListItemGutter: {
    padding: 0
  },
  listItemIcon: {
    paddingRight: theme.MetricsSizes.small_xx,
    minWidth: theme.MetricsSizes.small_xx,
    [theme.breakpoints.down('xs')]: {
      paddingLeft: theme.MetricsSizes.large_x
    },
    paddingLeft: theme.spacing(7)
  }
}));

type Props = {
  routes: {
    id?: number;
    name?: string;
    path: string;
    iconComponent?: () => React.ReactNode;
  }[];
  containerStyles?: any;
  logOutTextColor?: string;
  onClickNavItem?: (event?: any) => void;
};
const NavListItem = ({
  routes,
  containerStyles,
  logOutTextColor,
  onClickNavItem
}: Props) => {
  const { closeSidebar } = useContext(SidebarContext);
  const theme: Theme = useTheme();
  const styles = useStyles({ logOutTextColor: logOutTextColor });

  const onClickItem = (event: any) => {
    closeSidebar();
    if (onClickNavItem) {
      onClickNavItem(event);
    }
  };

  return (
    <Box sx={containerStyles}>
      <List>
        {routes.length
          ? routes.map((item, index) => (
              <ListItem
                button
                key={index}
                component={item.name === 'Log out' ? 'div' : RouterLink}
                to={item.path}
                replace={item.name === 'Log out' && true}
                className={
                  item.name === 'Log out'
                    ? styles.listItemLogout
                    : styles.listItem
                }
                classes={{
                  gutters: styles.ListItemGutter
                }}
                onClick={onClickItem}
              >
                <Grid style={{ width: 5, height: 49 }} />
                <ListItemIcon className={styles.listItemIcon}>
                  {item.iconComponent()}
                </ListItemIcon>
                <ListItemText
                  primary={item.name}
                  primaryTypographyProps={{
                    style: { fontSize: theme.MetricsSizes.small_xxx }
                  }}
                />
              </ListItem>
            ))
          : null}
      </List>
    </Box>
  );
};

export default NavListItem;
