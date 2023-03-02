import { authService } from './authService';
import { enrollmentManagementService } from './enrollmentManagementService';
import { adminUserService } from './AdminUserService';
import { categoryManagementService } from './categoryManagementService';
import { courseManagementService } from './courseManagementService';
import { overViewServices } from './overViewServices';
import { imageUploadService } from './imageUploadService';
import { notificationService } from './notificationService';
import { settingsPageService } from './settingsPageService';
import { instructorService } from './InstructorService';
import { bannerManagementService } from './bannerManagementService';
import { sectionAndLessonService } from './sectionAndLessonService';
import { videoUploadService } from './videoUploadService';
import { courseLevelManagementService } from './courseLevelManagementService';
import { courseLevelService } from './courseLevelService';
import { pageManagementService } from './pageManagementService';
import { quizService } from './quizService';
import { homeUserService } from './HomeUserService';
import {  instructorReportsService } from './InstructorReportsService';
import { PreRecordedCourseVideoService } from './preRecordedCourseVideoService';
import { AddToCartService } from './addToCartService';

export const API_SERVICES = {
  authService,
  adminUserService,
  enrollmentManagementService,
  categoryManagementService,
  courseManagementService,
  overViewServices,
  imageUploadService,
  notificationService,
  settingsPageService,
  instructorService,
  bannerManagementService,
  sectionAndLessonService,
  videoUploadService,
  courseLevelManagementService,
  courseLevelService,
  pageManagementService,
  quizService,
  homeUserService,
  instructorReportsService,
  PreRecordedCourseVideoService,
  AddToCartService
};
