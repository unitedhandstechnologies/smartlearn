import { useState } from 'react';
import { useTheme, Grid } from '@material-ui/core';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { BoxComp } from 'src/components';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme: Theme) => ({
  rootMainContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    [theme.breakpoints.up('lg')]: {
      marginLeft: `${theme.sidebar.width}`
    }
  }
}));
export type HeaderOutletContext = { searchValue: string | null, setSearchValue };

const SidebarLayout = () => {
  const theme: Theme = useTheme();
  const styles = useStyles();
  const routesLocation = useLocation();
  const { t, i18n } = useTranslation();
  const [searchValue, setSearchValue] = useState('');

  const HeaderRoutes = [
    {
      path: '/admin/dashboard',
      header: t('permission.dashboard'),
      info: t('description.dashboardInformation'),
      searchNeeded: false
    },
    {
      path: '/admin/enrollment-management',
      header: t('permission.enrollmentManagement'),
      info: t('description.manageEnrollmentManagementInformation'),
      searchNeeded: true
    },
    {
      path: '/admin/category-management',
      header: t('permission.categoryManagement'),
      info: t('description.manageCategoryManagementInformation'),
      searchNeeded: true
    },    
    {
      path: '/admin/instructor-management',
      header: t('permission.instructorManagement'),
      info: t('description.manageInstructorManagement'),
      searchNeeded: true
    },{
      path: '/admin/course-management',
      header: t('permission.courseManagement'),
      info: t('description.manageCourseManagement'),
      searchNeeded: true
    },
    {
      path: '/admin/students-administration',
      header: t('permission.studentsAdministration'),
      info: t('description.manageStudentsAdministrationInformation'),
      searchNeeded: true
    },
    {
      path: '/admin/admin-management',
      header: t('permission.adminManagement'),
      info: t('description.manageAdminDetails'),
      searchNeeded: true
    },
    {
      path: '/admin/page-management',
      header: t('permission.pageManagement'),
      info: t('description.managePage'),
      searchNeeded: false
    },
    {
      path: '/admin/course-level-management',
      header: t('permission.courseLevelManagement'),
      info: t('description.manageCourseLevel'),
      searchNeeded: false
    },
    {
      path: '/admin/settings',
      header: t('permission.setting'),
      info: t('description.manageSettings'),
      searchNeeded: false
    },
    {
      path: '/admin/reports',
      header: t('permission.report'),
      info: t('description.analyticalInformation'),
      searchNeeded: false
    }
  ];

  const onsearchInputChange = (event: any) => {
    setSearchValue(event.target.value);
  };

  return (
    <Grid>
      <Sidebar />
      <Grid className={styles.rootMainContainer}>
        <BoxComp>
          {HeaderRoutes.map((item, index) => {
            if (item.path === routesLocation.pathname) {
              return (
                <Header
                  key={index}
                  header={item.header}
                  info={item.info}
                  searchNeeded={item.searchNeeded}
                  searchValue={searchValue}
                  onsearchInputChange={onsearchInputChange}
                />
              );
            }
          })}
          <Outlet context={{ searchValue, setSearchValue }} />
        </BoxComp>
      </Grid>
    </Grid>
  );
};

export default SidebarLayout;
