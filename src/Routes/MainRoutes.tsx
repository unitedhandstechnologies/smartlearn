import { RouteObject } from 'react-router';
import BaseLayout from 'src/layouts/BaseLayout';
import { HomeRoutes } from './HomeRoutes';
import { Status404 } from 'src/components';
import { AdminRoutes } from './AdminRoutes';

export const MainRoutes: RouteObject[] = [
  {
    path: '',
    element: <BaseLayout />,
    children: HomeRoutes
  },
  {
    path: 'admin',
    element: <BaseLayout />,
    children: AdminRoutes
  },
  {
    path: '*',
    element: <Status404 />
  }
];
