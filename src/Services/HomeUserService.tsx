import { async } from 'q';
import { Config } from 'src/Config';
import { apiOptions } from 'src/Utils/apiOptions';
import { apiRequest } from 'src/Utils/apiRequest';

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
    return apiRequest(options)
  }
};
