import { Avatar, makeStyles, useTheme } from '@material-ui/core';
import React, { useCallback, useContext, useEffect, useState } from 'react';
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

const useStyles = makeStyles((theme) => ({
  gridStyle: {
    border: '1px solid',
    borderColor: theme.Colors.secondary,
    padding: theme.spacing(3)
  },
  selectedTabStyle: {
    color: theme.Colors.white,
    background: theme.Colors.secondary,
    fontWeight: theme.fontWeight.bold,
    borderRadius: theme.MetricsSizes.tiny
  },
  tabContentContainer: {
    margin: theme.spacing(0, 3)
  }
}));

interface NavigateProps {
   state?: any;
}

const Profile = (props: NavigateProps) => {
  const classes = useStyles();
  const theme = useTheme();
  const { studentDetails, updateStudentInfo } = useStudentInfo();
  const [enrollCourse, setEnrollCourse] = useState<any>([]);
  console.log(enrollCourse, 'test enrollCourse');
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
  const [selectedTab, setSelectedTab] = useState(state?.tabVal ?? tabContent[0]?.id);
  const onTabChange = (value: number) => {
    setSelectedTab(value);    
  };

  const renderTabContent = (tabVal?: any) => {
    const findActiveTab = tabContent.find(({ id }) => id === tabVal);
    return (
      <Grid className={classes.tabContentContainer}>
        {findActiveTab ? findActiveTab.component() : null}
      </Grid>
    );
  };

  const fetchData = async () => {
    try {
      const response: any =
        await API_SERVICES.enrollmentManagementService.getById(
          studentDetails?.id,
          {
            failureMessage: 'No course enrolled with the Student'
          }
        );

      if (response?.status < HTTP_STATUSES.BAD_REQUEST) {
        setEnrollCourse(response?.data?.enrolledCourse);
      }
    } catch (err) {
      toast.error(err?.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderHeader = () => {
    return (
      <>
        <Grid
          xs={12}
          sx={{
            [theme.breakpoints.down('xs')]: {
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
          headingText={`${studentDetails.first_name} ${studentDetails.last_name}`}
          headerFontSize={'32px'}
          headerFontWeight={500}
          headerFontFamily={'IBM Plex Serif'}
          headingColor={'#3C414B'}
        />
        <Grid style={{ padding: '0px 0px 20px 0px' }}>
          <img src={BlueLine} />
        </Grid>
      </>
    );
  };

  return (
    <Grid
      container
      item
      xs={12}
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
