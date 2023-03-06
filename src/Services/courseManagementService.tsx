import { apiOptions } from 'src/Utils/apiOptions';
import { apiRequest } from 'src/Utils/apiRequest';
import { Config } from 'src/Config';

type courseCreate = {
  data: {};
  successMessage?: string;
  failureMessage?: string;
};
type UpdateProps = {
  data: any;
  successMessage?: string;
  failureMessage?: string;
};
export const courseManagementService = {
  createCourse: async ({ data, successMessage, failureMessage }: any) => {
    const options = await apiOptions({
      url: `${Config.BASE_URL}/api/courseCreate`,
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

  getAllBy: async (course_type_id: number) => {
    const options = await apiOptions({
      url: `${Config.BASE_URL}/api/getAllCourse`,
      method: 'get',
      params: { course_type_id }
    });
    return apiRequest(options);
  },
  getAll: async (language_id: number, params?: any) => {
    const options = await apiOptions({
      url: `${Config.BASE_URL}/api/getAllCourse/language/${language_id}`,
      method: 'get',
      params: params
    });
    return apiRequest(options);
  },

  getById: async (id: number) => {
    const options = await apiOptions({
      url: `${Config.BASE_URL}/api/getCourse/${id}`,
      method: 'get'
    });
    return apiRequest(options);
  },
  update: async (
    courseId: number,
    { data, successMessage, failureMessage }: UpdateProps
  ) => {
    const options = await apiOptions({
      url: `${Config.BASE_URL}/api/updateCourse/${courseId}`,
      method: 'patch',
      data: data
    });
    const toastMessageConfig = {
      success: { message: successMessage },
      failure: { message: failureMessage }
    };
    return apiRequest(options, toastMessageConfig);
  },

  replace: async (
    courseId: number,
    { data, successMessage, failureMessage }: UpdateProps
  ) => {
    const options = await apiOptions({
      url: `${Config.BASE_URL}/${courseId}`,
      method: 'put',
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

  createByAdmin: async ({
    data,
    successMessage,
    failureMessage
  }: courseCreate) => {
    const options = await apiOptions({
      url: `${Config.BASE_URL}/`,
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
  delete: async (
    courseId: number,
    {
      successMessage,
      failureMessage
    }: {
      successMessage?: string;
      failureMessage?: string;
    }
  ) => {
    const options = await apiOptions({
      url: `${Config.BASE_URL}/api/deleteCourse/${courseId}`,
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
  },
  getStatistic: async () => {
    const options = await apiOptions({
      url: `${Config.BASE_URL}/api/getAllCourseCount`,
      method: 'get'
    });
    return apiRequest(options);
    //return data.dataGet;
  }
};
