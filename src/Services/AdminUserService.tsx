import { apiOptions } from 'src/Utils/apiOptions';
import { apiRequest } from 'src/Utils/apiRequest';
import { Config } from 'src/Config';

type UserDetailsProp = {
  data: any;
  successMessage?: string;
  failureMessage?: string;
};

export const adminUserService = {
  create: async ({ data, successMessage, failureMessage }: UserDetailsProp) => {
    const options = await apiOptions({
      url: `${Config.BASE_URL}/api/createUser`,
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

  getAll: async (params: any = {}) => {
    const options = await apiOptions({
      url: `${Config.BASE_URL}/api/getAllusers`,
      method: 'get',
      params: params
    });
    return apiRequest(options);
  },

  getAllUsers :async (params: any = {}) => {
    const options = await apiOptions({
      url: `${Config.BASE_URL}/api/getAllUsers`,
      method: 'get',
      params: params
    });
    return apiRequest(options);
  }, //To acces without permission

  getById: async (id: number) => {
    const options = await apiOptions({
      url: `${Config.BASE_URL}/api/getUserById/${id}`,
      method: 'get'
    });
    return apiRequest(options);
  },

  update: async (
    id: number,
    { data, successMessage, failureMessage }: UserDetailsProp
  ) => {
    const options = await apiOptions({
      url: `${Config.BASE_URL}/api/updateUser/${id}`,
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

  replace: async (id, { data, successMessage, failureMessage }) => {
    const options = await apiOptions({
      url: `${Config.BASE_URL}/api/replaceUser/ ${id}`,
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
      url: `${Config.BASE_URL}/api/deleteUser/${id}`,
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

  getAccessPermissions: async () => {
    const options = await apiOptions({
      url: `${Config.BASE_URL}/api/getAllAccessPermissions`,
      method: 'get'
    });
    return apiRequest(options);
  }
};
