import { async } from 'q';
import { Config } from 'src/Config';
import { apiOptions } from 'src/Utils/apiOptions';
import { apiRequest } from 'src/Utils/apiRequest';

export type DefaultProp = {
  data: any;
  successMessage?: string;
  failureMessage?: string;
};

export const homeUserService = {
  getAll: async (params: any = {}) => {
    const options = await apiOptions({
      url: `${Config.BASE_URL}/api/getAllusers`,
      method: 'get',
      params: params
    });
    return apiRequest(options);
  },
  getAllRatings: async (params: any = {}) => {
    const options = await apiOptions({
      url: `${Config.BASE_URL}/api/getAllRatings`,
      method: 'get',
      params: params
    });
    return apiRequest(options);
  },
  getAllCourseRating: async (courseId: number, params: any = {}) => {
    const options = await apiOptions({
      url: `${Config.BASE_URL}/api/getAllRatingsCourse/course/${courseId}`,
      method: 'get',
      params: params
    });
    return apiRequest(options);
  },
  create: async (
    studentId: number,
    courseId: number,
    { data, successMessage, failureMessage }: DefaultProp
  ) => {
    const options = await apiOptions({
      url: `${Config.BASE_URL}/api/user/${studentId}/ratingsAndReviews/course/${courseId}`,
      method: 'post',
      data: data
    });
    const toastMessageConfig = {
      success: {
        message: successMessage
      },
      failure: {
        message: failureMessage
      }
    };
    return apiRequest(options, toastMessageConfig);
  },
  getAllStudentBannerManagement: async (languageId: number) => {
    const options = await apiOptions({
      url: `${Config.BASE_URL}/api/getAllStudentBannerManagement/${languageId}`,
      method: 'get'
    });
    return apiRequest(options)
  }
};
