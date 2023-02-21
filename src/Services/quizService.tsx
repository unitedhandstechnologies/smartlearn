import { apiOptions } from 'src/Utils/apiOptions';
import { apiRequest } from 'src/Utils/apiRequest';
import { Config } from 'src/Config';

type UpdateProps = {
  data: any;
  successMessage?: string;
  failureMessage?: string;
};

type MessageProp = Omit<UpdateProps, 'data'>;

export const quizService = {
  createQuiz: async (
    courseId: number,
    { successMessage, failureMessage, data }: UpdateProps
  ) => {
    const options = await apiOptions({
      url: `${Config.BASE_URL}/api/createQuiz/course/${courseId}`,
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

  updateQuiz: async (
    quizId: number,
    { successMessage, failureMessage, data }: UpdateProps
  ) => {
    const options = await apiOptions({
      url: `${Config.BASE_URL}/api/updateQuiz/quiz/${quizId}`,
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

  getQuizById: async (quizId: number) => {
    console.log(quizId);
    const options = await apiOptions({
      url: `${Config.BASE_URL}/api/getQuizById/${quizId}`,
      method: 'get'
    });

    return apiRequest(options);
  },

  getAllQuiz: async ( languageId: number, courseId: number) => {
    const options = await apiOptions({
      url: `${Config.BASE_URL}/api/getAllQuiz/language/${languageId}/course/${courseId}`,
      method: 'get'
    });
    return apiRequest(options);
  },


 

  deleteQuiz: async (
    QuizId: number,
    { successMessage, failureMessage }: MessageProp
  ) => {
    const options = await apiOptions({
      url: `${Config.BASE_URL}/api/deleteQuiz/${QuizId}`,
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

  
};
