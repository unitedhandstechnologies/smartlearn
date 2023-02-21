import { apiOptions } from 'src/Utils/apiOptions';
import { apiRequest } from 'src/Utils/apiRequest';
import { Config } from 'src/Config';

type UpdateProps = {
  data: any;
  successMessage?: string;
  failureMessage?: string;
};

type MessageProp = Omit<UpdateProps, 'data'>;

export const sectionAndLessonService = {
  createSection: async (
    courseId: number,
    { successMessage, failureMessage, data }: UpdateProps
  ) => {
    const options = await apiOptions({
      url: `${Config.BASE_URL}/api/course/${courseId}/createSection`,
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

  updateSection: async (
    sectionId: number,
    { successMessage, failureMessage, data }: UpdateProps
  ) => {
    const options = await apiOptions({
      url: `${Config.BASE_URL}/api/updateSection/section/${sectionId}`,
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

  getBySectionId: async (sectionId: number) => {
    console.log(sectionId);
    const options = await apiOptions({
      url: `${Config.BASE_URL}/api/getSectionById/${sectionId}`,
      method: 'get'
    });

    return apiRequest(options);
  },

  getAllSection: async (courseId: number, languageId: number) => {
    const options = await apiOptions({
      url: `${Config.BASE_URL}/api/getAllSection/course/${courseId}/language/${languageId}`,
      method: 'get'
    });
    return apiRequest(options);
  },

  getAllLessonByCourseId: async (courseId: number, languageId: number) => {
    const options = await apiOptions({
      url: `${Config.BASE_URL}/api/getAllLessonByCourseId/course/${courseId}/language/${languageId}`,
      method: 'get'
    });
    return apiRequest(options);
  },

  createLesson: async (
    courseId: number,
    sectionId: number,
    { data, successMessage, failureMessage }: UpdateProps
  ) => {
    const options = await apiOptions({
      url: `${Config.BASE_URL}/api/course/${courseId}/section/${sectionId}/createLesson`,
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

  updateLesson: async (
    lessonId: number,
    { data, successMessage, failureMessage }: UpdateProps
  ) => {
    const options = await apiOptions({
      url: `${Config.BASE_URL}/api/updateLesson/lesson/${lessonId}`,
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
  getLessonById: async (lessonId: number) => {
    const options = await apiOptions({
      url: `${Config.BASE_URL}/api/getLessonById/${lessonId}`,
      method: 'get'
    });
    return apiRequest(options);
  },

  deleteSection: async (
    sectionId: number,
    { successMessage, failureMessage }: MessageProp
  ) => {
    const options = await apiOptions({
      url: `${Config.BASE_URL}/api/deleteSection/${sectionId}`,
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

  deleteLesson: async (
    lessonId: number,
    { successMessage, failureMessage }: MessageProp
  ) => {
    const options = await apiOptions({
      url: `${Config.BASE_URL}/api/deleteLesson/${lessonId}`,
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
