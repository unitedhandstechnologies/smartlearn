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
  }
};
