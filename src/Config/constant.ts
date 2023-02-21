export const AND_SEPARATOR = ';';
export const OR_SEPARATOR = ',';
export const ASSIGNMENT_SEPARATOR = '=';

export const HTTP_STATUSES = {
  OK: 200,
  SUCCESS: 201,
  NOT_MODIFIED: 304,
  BAD_REQUEST: 400,
  SERVER_ERROR: 500
};

export const TOAST_TYPES = {
  ERROR: 'error',
  WARNING: 'warning',
  SUCCESS: 'success',
  INFO: 'info',
  LINK: 'link'
};

export const HANDLE_SUBMIT = {
  viewUser: 'viewUser',
  createUser: 'editOrCreateUser'
};

export const CONFIRM_MODAL = {
  delete: 'delete',
  cancel: 'cancel',
  accept: 'accept',
  reject: 'reject',
  create: 'create',
  edit: 'edit',
  logout: 'logout'
};

export const FILTER_CHIPS = ['This Week', 'Month', 'Year'];

export const GET_FILTER_VALUES = {
  ['This Week']: 1,
  ['Month']: 2,
  ['Year']: 3
};

export const DEFAULT_TABLE_ROW_COUNT = 20;

export const USER_TYPE_ID = {
  superAdmin: 1,
  admin: 2,
  mentors: 3,
  student: 4
};

export const STATUS_ID = {
  New: 1,
  Accepted: 2,
  Rejected: 3
};

export const PERMISSIONS = {
  adminDashboard: 1,
  enrollmentManagement: 2,
  categoryManagement: 3,
  courseManagement: 4,
  instructorManagement: 5,
  studentsAdministration: 6,
  adminManagement: 7,
  reports: 8,
  settings: 9,
  pageManagement: 11 ,
  courseLevelManagement: 10,
};

export const LANGUAGE_ID = {
  english: 1,
  hindi: 2,
  gujarati: 3
};

export const LANGUAGE_NAME = {
  1: 'English',
  2: 'Hindi',
  3: 'Gujarati'
};

export const COURSE_PAYMENT_TYPE = {
  paid: 1,
  free: 2
};

export const COURSE_PAYMENT_NAME = {
  1: 'PAID',
  2: 'FREE'
};
export const COURSE_LEVEL = {
  Beginner: 1,
  intermediate: 2,
  advanced: 3
};

export const COURSE_LEVEL_NAME = {
  1: 'Beginner',
  2: 'Intermediate',
  3: 'Advanced'
};
export const MODE = {
  online: 1,
  offline: 2
};

export const MODE_NAME = {
  1: 'Online',
  2: 'Offline'
};

export const COURSE_TYPE = {
  workshop: 1,
  seminor: 2,
  webinar: 3,
  liveCourse: 4,
  savedCourse: 5
};

export const COURSE_TYPE_NAME = {
  1: 'Seminar',
  2: 'Masterclass',
  3: 'Webinar',
  4: 'Workshop',
  5: 'Live courses',
  6: 'Recorded Course'
};

export const COURSE_STATUS_ID = {
  enabled: 1,
  disabled: 2,
  pending: 3
};
export const COURSE_STATUS_NAME = {
  1: 'enabled',
  2: 'disabled',
  3: 'pending'
};

export const USER_TYPES = {
  superAdmin: 1,
  admin: 2,
  mentor: 3,
  student: 4
};

export const MENTOR_STATUS = {
  new: 1,
  accepted: 2
};

export const DETECT_LANGUAGE = {
  en: 1,
  hi: 2,
  gu: 3
};

export const IMAGE_SIZE = {
  size: 2 * 1024 * 1024, //  2 Mb size
  imgSize: 250,
  imgNum: 100
};
