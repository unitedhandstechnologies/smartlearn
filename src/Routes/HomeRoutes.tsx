import { Navigate, RouteObject } from 'react-router';
import CourseBegin from 'src/content/StudentContent/Courses/CourseBegin/CourseBegin';
import NavBar from 'src/content/StudentContent/NavBar';
import HomePage from 'src/content/StudentContent/HomePage/HomePage';
import UserLogin from 'src/content/StudentContent/HomePage/UserLogin/UserLogin';
import WorkShop from 'src/content/StudentContent/WorkShopPages';
import Seminars from 'src/content/StudentContent/SeminarsWebinarsPages/Seminars';
import Masterclasses from 'src/content/StudentContent/MasterclassesPages';
import Registration from 'src/content/StudentContent/RegistrationPage/Registration';
import Courses from 'src/content/StudentContent/Courses';
import Profile from 'src/content/StudentContent/Profile';
import PreRecordedCourses from 'src/content/StudentContent/Courses/PreRecordedCourses';
import WorkShopDetails from '../content/StudentContent/WorkShopPages/WorkShopDetails';
import MentorCreatedCourses from 'src/content/StudentContent/MasterclassesPages/MentorCourses';
import MentorCourseDescription from 'src/content/StudentContent/MasterclassesPages/MentorCourseDescription';
import ProfileHome from 'src/content/StudentContent/Profile/ProfileHome';
import ForgetPassword from 'src/content/StudentContent/RegistrationPage/ForgetPassword';

export const HomeRoutes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="home" replace />
  },
  {
    path: 'home',
    element: <NavBar />,
    children: [
      { path: '', element: <HomePage /> },
      { path: 'courses', element: <Courses /> },
      { path: 'workshops', element: <WorkShop /> },
      { path: 'seminars-webinars', element: <Seminars /> },
      { path: 'masterclasses', element: <Masterclasses /> },
      { path: 'mentor-courseProfile', element: <MentorCreatedCourses /> },
      {
        path: 'mentor-courseProfile/masterClass-courseDetails',
        element: <MentorCourseDescription />
      },
      { path: 'user-login', element: <UserLogin /> },
      { path: 'user-registration', element: <Registration /> },
      { path: 'profile', element: <Profile /> },
      { path: 'pre-recordedCourse', element: <PreRecordedCourses /> },
      { path: 'workshopDetails', element: <WorkShopDetails /> },
      { path: 'profilehome', element: <ProfileHome /> },
      { path: 'forgetpassword', element: <ForgetPassword /> }
    ]
  }
];
