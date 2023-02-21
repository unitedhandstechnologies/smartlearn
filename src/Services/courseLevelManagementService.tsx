import { Config } from 'src/Config';
import { apiOptions } from 'src/Utils/apiOptions';
import { apiRequest } from 'src/Utils/apiRequest';

export const courseLevelManagementService = {
  getAllCourseLevels: async (languageId: number) => {
    const options = await apiOptions({
      url: `${Config.BASE_URL}/api/getAllCourseLevel/language/${languageId}`,
      method: 'get'
    });
    return apiRequest(options);
  }
};
