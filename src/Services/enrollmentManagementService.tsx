import { apiOptions } from 'src/Utils/apiOptions';
import { apiRequest } from 'src/Utils/apiRequest';
import { Config } from 'src/Config';
import { enrollCourseData, studentEnrollData } from './enrollmentStub';

export type DefaultProp = {
  data: any;
  successMessage?: string;
  failureMessage?: string;
};
export const enrollmentManagementService = {
  create: async (
    studentId: number,
    courseId: number,
    { data, successMessage, failureMessage }: DefaultProp
  ) => {
    const options = await apiOptions({
      url: `${Config.BASE_URL}/api/student/${studentId}/enrolledCourseCreate/course/${courseId}`,
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
  getAllBy: async (id: number, params?: any) => {
    const options = await apiOptions({
      url: `${Config.BASE_URL}/api/getDistinctStudentInCourse/${id}`,
      method: 'get',
      params: params
    });
    return apiRequest(options);
    //return studentEnrollData.enrollGet;
  },

  getById: async (
    studentId: number,
    {
      failureMessage
    }: {
      failureMessage?: string;
    }
  ) => {
    const options = await apiOptions({
      url: `${Config.BASE_URL}/api/getEnrolledCourse/${studentId}`,
      method: 'get'
    });
    const toastMessageConfig = {
      failure: {
        message: failureMessage
      }
    };
    return apiRequest(options, toastMessageConfig);
  },

  getByCourseIdUserId: async (
    studentId: number,
    courseId: number,    
  ) => {
    const options = await apiOptions({
      url: `${Config.BASE_URL}/api/getStudentByIdCourse/student/${studentId}/course/${courseId}`,
      method: 'get'
    });    
    return apiRequest(options);
  },

  replace: async (
    enrollId: number,
    { data, successMessage, failureMessage }: DefaultProp
  ) => {
    const options = await apiOptions({
      url: `${Config.BASE_URL}/api/updateEnrolledCourse/${enrollId}`,
      method: 'patch',
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
      url: `${Config.BASE_URL}/api/deleteEnrolledCourse/${id}`,
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
