import { Navigate, RouteObject } from 'react-router';
import { PERMISSIONS } from 'src/Config/constant';
import AdminDashboard from 'src/content/AdminDashboard';
import AdminManagement from 'src/content/AdminManagement';
import CategoryManagement from 'src/content/CategoryManagement';
import CourseLevelManagement from 'src/content/CourseLevelManagement';
import CourseManagement from 'src/content/CourseManagement';
import EnrollmentManagement from 'src/content/EnrollmentManagement';
import InstructorManagement from 'src/content/InstructorManagement';
import Login from 'src/content/Login';
import PageManagement from 'src/content/PageManagement';
import Reports from 'src/content/Reports';
import Settings from 'src/content/Settings/Settings';
import StudentsAdministration from 'src/content/StudentsAdministration';
import SidebarLayout from 'src/layouts/SidebarLayout';
import PermissionRoute from 'src/PermissionRoute';
import PrivateRoute from 'src/PrivateRoute';

export const AdminRoutes: RouteObject[] = [
  {
    path: 'login',
    element: <Login />
  },
  {
    path: '',
    element: <PrivateRoute component={SidebarLayout} />,
    children: [
      {
        path: '',
        element: <Navigate to="dashboard" replace />
      },
      {
        path: 'dashboard',
        element: (
          <PermissionRoute
            component={AdminDashboard}
            permissionId={PERMISSIONS.adminDashboard}
          />
        )
      },
      {
        path: 'enrollment-management',
        element: (
          <PermissionRoute
            component={EnrollmentManagement}
            permissionId={PERMISSIONS.enrollmentManagement}
          />
        )
      },
      {
        path: 'category-management',
        element: (
          <PermissionRoute
            component={CategoryManagement}
            permissionId={PERMISSIONS.categoryManagement}
          />
        )
      },
      {
        path: 'course-management',
        element: (
          <PermissionRoute
            component={CourseManagement}
            permissionId={PERMISSIONS.courseManagement}
          />
        )
      },
      {
        path: 'instructor-management',
        element: (
          <PermissionRoute
            component={InstructorManagement}
            permissionId={PERMISSIONS.instructorManagement}
          />
        )
      },
      {
        path: 'students-administration',
        element: (
          <PermissionRoute
            component={StudentsAdministration}
            permissionId={PERMISSIONS.studentsAdministration}
          />
        )
      },
      {
        path: 'admin-management',
        element: (
          <PermissionRoute
            component={AdminManagement}
            permissionId={PERMISSIONS.adminManagement}
          />
        )
      },
      {
        path: 'page-management',
        element: (
          <PermissionRoute
            component={PageManagement}
            permissionId={PERMISSIONS.pageManagement}
          />
        )
      },
      {
        path: 'course-level-management',
        element: (
          <PermissionRoute
            component={CourseLevelManagement}
            permissionId={PERMISSIONS.pageManagement}
          />
        )
      },
      {
        path: 'settings',
        element: (
          <PermissionRoute
            component={Settings}
            permissionId={PERMISSIONS.settings}
          />
        )
      },
      {
        path: 'reports',
        element: (
          <PermissionRoute
            component={Reports}
            permissionId={PERMISSIONS.reports}
          />
        )
      }
    ]
  }
];
