import { useContext, useState, useEffect } from 'react';
import {
  Typography,
  IconButton,
  useTheme,
  Grid,
  InputAdornment,
  Avatar,
  Badge,
  Popover,
  Box
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { SidebarContext } from 'src/contexts/SidebarContext';
import { makeStyles, Theme } from '@material-ui/core/styles';
import BellIcon from '../../../Assets/Images/BellIcon.svg';
import SearchIcon from '@material-ui/icons/Search';
import { Helmet } from 'react-helmet-async';
import { ButtonComp, Heading, TextInputComponent } from 'src/components';
import { UserInfoContext } from 'src/contexts/UserContext';
import { Close, FiberManualRecord } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import { API_SERVICES } from 'src/Services';
import { HTTP_STATUSES } from 'src/Config/constant';
import LanguageSelection from './LanguageSelection';
import { AvatarImg } from 'src/Assets';
import UserCart from 'src/content/StudentContent/HomePage/userNavBarBox/UserCart';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    borderRadius: theme.MetricsSizes.large_x,
    paddingInline: theme.spacing(1.5),
    backgroundColor: theme.Colors.whitePrimary
  },
  mainContainer: {
    padding: theme.spacing(2, 0, 3, 0),
    zIndex: 6,
    backgroundColor: theme.Colors.white,
    width: '100%',
    position: 'sticky',
    top: 0
  },
  headerIcon: {
    [theme.breakpoints.up('lg')]: {
      display: 'none'
    },
    display: 'inline-block'
  },
  leftGrid: {
    display: 'flex',
    alignItems: 'center'
  },
  headerText: {
    fontSize: theme.MetricsSizes.medium_x,
    color: theme.Colors.blueDark,
    fontWeight: theme.fontWeight.bold
  },
  subHeader: {
    fontSize: theme.MetricsSizes.small_xxx,
    color: theme.Colors.blueLight
  },
  image: {
    margin: theme.spacing(0, 1, 0, 1)
  },
  avatarStyle: {
    height: 32,
    width: 32
  },
  select: {
    padding: theme.spacing(0, 1.5),
    fontSize: theme.MetricsSizes.small_xxx,
    color: theme.Colors.black
  },
  badgeStyle: {
    '& .MuiBadge-badge': {
      background: theme.Colors.redPrimary
    }
  },
  popover: {
    padding: theme.spacing(0, 2, 2, 2),
    width: 400,
    height: 300
  },
  titleStyle: {
    fontSize: theme.MetricsSizes.small_xx,
    fontWeight: theme.fontWeight.bold,
    color: theme.Colors.blueDark,
    marginLeft: theme.MetricsSizes.tiny_xxx
  },
  contentStyle: {
    display: 'flex',
    alignItems: 'initial',
    marginBottom: theme.spacing(1)
  },
  notificationHeader: {
    paddingTop: theme.spacing(2),
    display: 'flex',
    position: 'sticky',
    top: 0,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    background: theme.Colors.white
  }
}));

type Props = {
  header: string;
  path?: string;
  info: string;
  searchValue: string;
  searchNeeded: boolean;
  onsearchInputChange: (e: any) => void;
};

const Header = (props: Props) => {
  const { searchValue, onsearchInputChange, header, info, searchNeeded } =
    props;
  const { t } = useTranslation();
  const theme: Theme = useTheme();
  const styles = useStyles();
  const { toggleSidebar } = useContext(SidebarContext);
  const { userDetails } = useContext(UserInfoContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationData, setNotificationData] = useState([]);
  console.log(userDetails, 'userDetails');
  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  // const fetchData = async () => {
  //   const response: any =
  //     await API_SERVICES.notificationService.getAllNotifications();
  //   if (response?.status < HTTP_STATUSES.BAD_REQUEST) {
  //     if (response?.data?.notifications?.length) {
  //       const data = response.data.notifications.map(
  //         (item: any) => item.notification
  //       );
  //       setNotificationData([...new Set(data)]);
  //     } else {
  //       setNotificationData([]);
  //     }
  //   }
  // };

  // const onClickClearNotification = async () => {
  //   if (!notificationData?.length) {
  //     return;
  //   }
  //   const response: any =
  //     await API_SERVICES.notificationService.deleteNotifications();
  //   if (response?.status < HTTP_STATUSES.BAD_REQUEST) {
  //     fetchData();
  //     setAnchorEl(null);
  //   }
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  return (
    <Grid className={styles.mainContainer}>
      <Helmet>
        <title>{header}</title>
      </Helmet>
      <Grid className={styles.headerIcon}>
        <IconButton color="primary" onClick={toggleSidebar}>
          <MenuIcon fontSize="small" />
        </IconButton>
      </Grid>
      <Grid container alignItems="center">
        <Grid item>
          <Typography className={styles.headerText}>{header}</Typography>
          <Typography className={styles.subHeader}>{info}</Typography>
        </Grid>
        <Grid container item xs alignItems="center" justifyContent="flex-end">
          <Grid item>
            {searchNeeded ? (
              <TextInputComponent
                fullWidth={true}
                onChange={onsearchInputChange}
                value={searchValue}
                InputProps={{
                  classes: {
                    root: styles.root
                  },
                  endAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  )
                }}
              />
            ) : null}
          </Grid>
          <Grid item className={styles.leftGrid}>
            {userDetails.user_type === 1 || userDetails.user_type === 2 ? (
              <>
                <IconButton
                  className={styles.image}
                  onClick={handlePopoverOpen}
                >
                  <Badge
                    variant="dot"
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right'
                    }}
                    className={notificationData?.length && styles.badgeStyle}
                  >
                    <img src={BellIcon} />
                  </Badge>
                </IconButton>
                <Popover
                  open={Boolean(anchorEl)}
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left'
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                  onClose={handlePopoverClose}
                  classes={{ paper: styles.popover }}
                >
                  <Grid container spacing={1} className={styles.leftGrid}>
                    <Grid item xs={12} className={styles.notificationHeader}>
                      <Heading
                        headingText={t('notifications')}
                        headingColor={theme.Colors.accentGrey}
                      />
                      <ButtonComp
                        buttonText={'Clear All'}
                        buttonFontSize={theme.MetricsSizes.small_xx}
                        buttonFontWeight={theme.fontWeight.regular}
                        backgroundColor={'transparent'}
                        buttonTextColor={theme.Colors.black}
                        startIcon={<Close fontSize="small" color="primary" />}
                        btnWidth={120}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      {notificationData.length ? (
                        notificationData.map((item, index) => {
                          return (
                            <Box className={styles.contentStyle} key={index}>
                              <FiberManualRecord
                                fontSize="small"
                                style={{ color: theme.Colors.blueLight }}
                              />
                              <Typography className={styles.titleStyle}>
                                {item}
                              </Typography>
                            </Box>
                          );
                        })
                      ) : (
                        <Typography className={styles.titleStyle}>
                          No New Notifications!
                        </Typography>
                      )}
                    </Grid>
                  </Grid>
                </Popover>
                <LanguageSelection />
                <Avatar
                  className={styles.avatarStyle}
                  alt="Prabu"
                  src={AvatarImg}
                />
                <Typography className={styles.select}>
                  {userDetails.user_name}
                </Typography>
              </>
            ) : (
              <UserCart
                userName={userDetails.user_name}
                image={userDetails.image_url}
                userType={userDetails.user_type}
              />
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Header;
