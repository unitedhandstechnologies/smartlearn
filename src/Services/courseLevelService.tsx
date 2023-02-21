import { apiOptions } from 'src/Utils/apiOptions';
import { apiRequest } from 'src/Utils/apiRequest';
import { Config } from 'src/Config';

type CourseLevelProps = {
  data: any;
  successMessage?: string;
  failureMessage?: string;
};
export const courseLevelService = {
  create: async ({
    data,
    successMessage,
    failureMessage
  }: CourseLevelProps) => {
    const options = await apiOptions({
      url: `${Config.BASE_URL}/api/createCourseLevel`,
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
    //return createCategory.createData;
  },
  getAllCourse: async (languageId: number, params?: any) => {
    const options = await apiOptions({
      url: `${Config.BASE_URL}/api/getAllCourseLevel/language/${languageId}`,
      method: 'get',
      params: params
    });
    return apiRequest(options);
    //return categoryData.categoryDataGet
  },

  getCourseLevelById: async (id: number) => {
    const options = await apiOptions({
      url: `${Config.BASE_URL}/api/getCourseLevelById/${id}`,
      method: 'get'
    });
    return apiRequest(options);
  },

  updateCourseLevel: async (
    courseLevelId: number,
    { data, successMessage, failureMessage }: CourseLevelProps
  ) => {
    const options = await apiOptions({
      url: `${Config.BASE_URL}/api/updateCourseLevel/courseLevel/${courseLevelId}`,
      method: 'patch',
      data: data
    });
    const toastMessageConfig = {
      success: { message: successMessage },
      failure: { message: failureMessage }
    };
    return apiRequest(options, toastMessageConfig);
  },

  delete: async (
    id: number,
    {
      successMessage,
      failureMessage
    }: {
      successMessage?: string;
      failureMessage?: string;
    }
  ) => {
    const options = await apiOptions({
      url: `${Config.BASE_URL}/api/deleteCourseLevel/${id}`,
      method: 'delete'
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
  }
};
