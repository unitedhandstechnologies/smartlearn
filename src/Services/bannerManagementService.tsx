import { apiOptions } from 'src/Utils/apiOptions';
import { apiRequest } from 'src/Utils/apiRequest';
import { Config } from 'src/Config';

type BannerProps = {
  data: any;
  successMessage?: string;
  failureMessage?: string;
};
export const bannerManagementService = {
  create: async ({ data, successMessage, failureMessage }: BannerProps) => {
    const options = await apiOptions({
      url: `${Config.BASE_URL}/api/createBannerManagement`,
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
  getAllBannerManagement: async (languageId: number, params?: any) => {
    const options = await apiOptions({
      url: `${Config.BASE_URL}/api/getAllBannerManagement/${languageId}`,
      method: 'get'
    });

    return apiRequest(options);
  },

  getBannerManagementById: async (
    Id: number,
    {
      successMessage,
      failureMessage
    }: {
      successMessage?: string;
      failureMessage?: string;
    }
  ) => {
    const options = await apiOptions({
      url: `${Config.BASE_URL}/api/getBannerManagementById/${Id}`,
      method: 'get'
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

  update: async (
    bannerId: number,
    { data, successMessage, failureMessage }: BannerProps
  ) => {
    const options = await apiOptions({
      url: `${Config.BASE_URL}/api/updateBannerManagement/banner/${bannerId}`,
      method: 'patch',
      data: data
    });
    const toastMessageConfig = {
      success: { message: successMessage },
      failure: { message: failureMessage }
    };
    return apiRequest(options, toastMessageConfig);
  },
  delete: async (
    Id: number,
    {
      successMessage,
      failureMessage
    }: {
      successMessage?: string;
      failureMessage?: string;
    }
  ) => {
    const options = await apiOptions({
      url: `${Config.BASE_URL}/api/deleteBannerManagement/${Id}`,
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
  uploadImage: async (data: FormData) => {
    const options = await apiOptions({
      url: `${Config.BASE_URL}/api/upload`,
      method: 'post',
      data: data,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return apiRequest(options);
  }
};
