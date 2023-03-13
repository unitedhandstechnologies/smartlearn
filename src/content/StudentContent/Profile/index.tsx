import React, { useEffect, useState } from 'react';
import { Avatar, makeStyles, useTheme } from '@material-ui/core';
import { BlueLine } from 'src/Assets';
import { Heading, MuiTabComponent } from 'src/components';
import MyLibrary from './MyLibrary';
import PaymentHistory from './PaymentHistory';
import ProfileDetails from './ProfileDetails';
import { Grid } from '@mui/material';
import useStudentInfo from 'src/hooks/useStudentInfo';
import toast from 'react-hot-toast';
import { HTTP_STATUSES } from 'src/Config/constant';
import { API_SERVICES } from 'src/Services';
import { useLocation } from 'react-router';
import { getUserId } from 'src/Utils';

const useStyles = makeStyles((theme) => ({
  gridStyle: {
    border: '1px solid',
    borderColor: theme.Colors.secondary,
    padding: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    width: '25%',
    height: '50%',
    [theme.breakpoints.down('sm')]: {
      width: '50%'
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%'
    }
  },
  selectedTabStyle: {
    color: theme.Colors.white,
    background: theme.Colors.secondary,
    fontWeight: theme.fontWeight.bold,
    borderRadius: theme.MetricsSizes.tiny,
    padding: 0
  },
  tabContentContainer: {
    margin: theme.spacing(0, 3)
  },
  tabStyle: {
    height: 100,
    border: '1px solid red'
  }
}));

const Profile = () => {
  const classes = useStyles();
  const theme = useTheme();
  const { studentDetails } = useStudentInfo();
  const [enrollCourse, setEnrollCourse] = useState<any>([]);

  const tabContent = [
    {
      label: 'Profile',
      id: 1,
      component: () => <ProfileDetails />
    },
    {
      label: 'My library',
      id: 2,
      component: () => <MyLibrary enrollCourse={enrollCourse} />
    },
    {
      label: 'My certificates',
      id: 3,
      component: () => <h1>My certificates</h1>
    },
    {
      label: 'Payment history',
      id: 4,
      component: () => <PaymentHistory />
    }
  ];
  const { state }: any = useLocation();
  const [selectedTab, setSelectedTab] = useState(
    state?.tabVal ?? tabContent[0]?.id
  );
  const onTabChange = (value: number) => {
    setSelectedTab(value);
  };

  const renderTabContent = (tabVal?: any) => {
    const findActiveTab = tabContent?.find(({ id }) => id === tabVal);
    return (
      <Grid className={classes.tabContentContainer}>
        {findActiveTab ? findActiveTab.component() : null}
      </Grid>
    );
  };

  const fetchData = async () => {
    let userId = getUserId();
    try {
      const response: any =
        await API_SERVICES.enrollmentManagementService.getById(userId, {
          failureMessage: ''
        });

      if (response?.status < HTTP_STATUSES.BAD_REQUEST) {
        setEnrollCourse(response?.data?.enrolledCourse);
      }
    } catch (err) {
      toast.error(err?.message);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();
  }, []);

  const renderHeader = () => {
    return (
      <Grid container direction={'column'} sx={{ rowGap: 2 }}>
        <Grid
          xs={12}
          sx={{
            [theme.breakpoints.down('sm')]: {
              flexDirection: 'column'
            }
          }}
        >
          <Avatar
            alt=""
            src={studentDetails.image_url}
            style={{ width: 100, height: 100 }}
          />
        </Grid>
        <Heading
          headingText={`${studentDetails?.first_name} ${studentDetails?.last_name}`}
          headerFontSize={'32px'}
          headerFontWeight={500}
          headerFontFamily={'IBM Plex Serif'}
          headingColor={'#3C414B'}
        />
        <Grid style={{ padding: '0px 0px 20px 0px' }}>
          <img src={BlueLine} />
        </Grid>
      </Grid>
    );
  };

  return (
    <Grid
      container
      // item
      // xs={12}
      sx={{
        padding: 4,
        [theme.breakpoints.down('sm')]: {
          flexDirection: 'column'
        }
      }}
    >
      <MuiTabComponent
        renderHeader={renderHeader}
        tabContent={tabContent}
        currentTabVal={selectedTab}
        onTabChange={onTabChange}
        orientation={'vertical'}
        tabIndicatorColor={'transparent'}
        renderTabContent={renderTabContent}
        tabClasses={{ selected: classes.selectedTabStyle }}
        tabContainerClassName={classes.gridStyle}
        fontSize={theme.MetricsSizes.regular}
      />
    </Grid>
  );
};

export default Profile;
