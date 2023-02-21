import { apiOptions } from 'src/Utils/apiOptions';
import { apiRequest } from 'src/Utils/apiRequest';
import { Config } from 'src/Config';

export const overViewServices = {
  getCustomerOrderOverView: async (id: number) => {
    const options = await apiOptions({
      url: `${Config.BASE_URL}/api/customerOrderOverView/${id}`,
      method: 'get'
    });
    return apiRequest(options);
  },

  vendorOrderOverView: async (id: number) => {
    const options = await apiOptions({
      url: `${Config.BASE_URL}/api/vendorOrderOverView/${id}`,
      method: 'get'
    });
    return apiRequest(options);
  },

  vendorRequestsOverView: async (id: number) => {
    const options = await apiOptions({
      url: `${Config.BASE_URL}/api/vendorRequestsOverView/${id}`,
      method: 'get'
    });
    return apiRequest(options);
  }
};
