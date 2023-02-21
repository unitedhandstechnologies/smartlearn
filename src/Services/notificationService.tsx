import { apiOptions } from 'src/Utils/apiOptions';
import { apiRequest } from 'src/Utils/apiRequest';
import { Config } from 'src/Config';

export const notificationService = {
  getAllNotifications: async () => {
    const options = await apiOptions({
      url: `${Config.BASE_URL}/api/getAllNotifications`,
      method: 'get'
    });
    return apiRequest(options);
  },

  deleteNotifications: async () => {
    const options = await apiOptions({
      url: `${Config.BASE_URL}/api/deleteNotifications`,
      method: 'delete'
    });
    return apiRequest(options);
  }
};
