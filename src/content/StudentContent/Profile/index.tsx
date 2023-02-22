import { Avatar, Grid, makeStyles, useTheme } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import { Avatar1, BlueLine } from 'src/Assets';
import { Heading, MuiTabComponent } from 'src/components';
import MyLibrary from './MyLibrary';
import PaymentHistory from './PaymentHistory';
import ProfileDetails from './ProfileDetails';
import { StudentInfoContext } from 'src/contexts/StudentContext';

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
const Profile = () => {
  const classes = useStyles();
  const theme = useTheme();
  const { studentDetails } = useContext(StudentInfoContext);
  const tabContent = [
    {
      label: 'Profile',
      id: 1,
      component: () => <ProfileDetails />
    },
    {
      label: 'My library',
      id: 2,
      component: () => <MyLibrary />
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
  const [selectedTab, setSelectedTab] = useState(tabContent[0]?.id);
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

  const renderHeader = () => {
    console.log('hi');

    return (
      <>
        <Grid>
          <Avatar alt="" src={Avatar1} style={{ width: 100, height: 100 }} />
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
    <Grid style={{ paddingTop: 20 }}>
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
