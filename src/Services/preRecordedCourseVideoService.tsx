import { apiOptions } from 'src/Utils/apiOptions';
import { apiRequest } from 'src/Utils/apiRequest';
import { Config } from 'src/Config';



export const PreRecordedCourseVideoService = {
  

  updateVideoDetails: async (
    courseId: number,
    userId: number,
    lessonId: number,
    {data} : any
  ) => {
    const options = await apiOptions({     
      url: `${Config.BASE_URL}/api/updateVideoPercentage/user/${userId}/course/${courseId}/lesson/${lessonId}`,
      method: 'patch',
      data: data
    });
    return apiRequest(options);
  },

  getVideoDetails: async (
    courseId: number,
    userId: number,
    ) => {    
    const options = await apiOptions({
      url: `${Config.BASE_URL}/api/getAllVideoPercentage/user/${userId}/course/${courseId}`,
      method: 'get'
    });
    return apiRequest(options);
  },   
};
