import React, { useContext, useMemo } from 'react';
import {
  EnrollmentManagementIcon,
  InstructorManagementIcon,
  DashboardReportIcon,
  StudentsAdministrationIcon,
  AdminManagementIcon,
  CategoryManagementIcon,
  CourseManagementIcon,
  ReportsIcon,
  SettingsIcon,
  Page
} from 'src/Assets/Images';
import { Box } from '@material-ui/core';
import { NavListItem } from 'src/components';
import { UserInfoContext } from 'src/contexts/UserContext';
import { useTranslation } from 'react-i18next';
import { SignalCellular4BarOutlined } from '@material-ui/icons';

const SidebarMenu = () => {
  const { userDetails } = useContext(UserInfoContext);
  const { t } = useTranslation();
  const routes = [
    {
      id: 1,
      name: t('home.dashboardReport'),
      path: 'dashboard',
      iconComponent: () => <DashboardReportIcon />
    },
    {
      id: 2,
      name: t('home.enrollmentManagement'),
      path: 'enrollment-management',
      iconComponent: () => <EnrollmentManagementIcon />
    },
    {
      id: 3,
      name: t('home.categoryManagement'),
      path: 'category-management',
      iconComponent: () => <CategoryManagementIcon />
    },

    {
      id: 5,
      name: t('home.instructorManagement'),
      path: 'instructor-management',
      iconComponent: () => <InstructorManagementIcon />
    },
    {
      id: 4,
      name: t('home.courseManagement'),
      path: 'course-management',
      iconComponent: () => <CourseManagementIcon />
    },
    {
      id: 6,
      name: t('home.studentsAdministration'),
      path: 'students-administration',
      iconComponent: () => <StudentsAdministrationIcon />
    },
    {
      id: 7,
      name: t('home.adminManagement'),
      path: 'admin-management',
      iconComponent: () => <AdminManagementIcon />
    },
    {
      id: 11,   
      name: t('home.pageManagement'),
      path: 'page-management',
      iconComponent: () => <Page />
    },
    {
      id: 10,   
      name: t('home.courseLevelManagement'),
      path: 'course-level-management',
      iconComponent: () => <SignalCellular4BarOutlined />
    },
    {
      id: 8,
      name: t('home.reports'),
      path: 'reports',
      iconComponent: () => <ReportsIcon />
    },
    {
      id: 9,
      name: t('home.settings'),
      path: 'settings',
      iconComponent: () => <SettingsIcon />
    }
  ];

  const filteredRoutes = useMemo(() => {
    const data = routes.filter((item) =>
      userDetails.permissions.includes(item.id)
    );
    return data ?? [];
  }, [userDetails.permissions]);

  return (
    <Box>
      <NavListItem routes={filteredRoutes} />
    </Box>
  );
};

export default SidebarMenu;
