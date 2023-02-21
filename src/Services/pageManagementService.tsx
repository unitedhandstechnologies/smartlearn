import { apiOptions } from 'src/Utils/apiOptions';
import { apiRequest } from 'src/Utils/apiRequest';
import { Config } from 'src/Config';

type PageManagementProps = {
  data: any;
  successMessage?: string;
  failureMessage?: string;
};
export const pageManagementService = {
  create: async ({ data, successMessage, failureMessage }: PageManagementProps) => {
    const options = await apiOptions({
      url: `${Config.BASE_URL}/api/createFAQ`,
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

  getAllFaq: async (languageId: number, params?: any) => {
    const options = await apiOptions({
      url: `${Config.BASE_URL}/api/getAllFAQ/language/${languageId}`,
      method: 'get',
      params: params
    });
    return apiRequest(options);
  },

  getFaqById: async (faqId: number) => {
    const options = await apiOptions({
      url: `${Config.BASE_URL}/api/getFAQById/${faqId}`,
      method: 'get'
    });
    return apiRequest(options);
  },

  updateFaq: async (
    faqId: number,
    { data, successMessage, failureMessage }: PageManagementProps
  ) => {
    const options = await apiOptions({
      url: `${Config.BASE_URL}/api/updateFAQ/faq/${faqId}`,
      method: 'patch',
      data: data
    });
    const toastMessageConfig = {
      success: { message: successMessage },
      failure: { message: failureMessage }
    };
    return apiRequest(options, toastMessageConfig);
  },

  deleteFaq: async (
   faqId: number,
    { successMessage, failureMessage }
  ) => {
    const options = await apiOptions({
      url: `${Config.BASE_URL}/api/deleteFAQ/${faqId}`,
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

  //CMS API's

  createCms: async ({ data, successMessage, failureMessage }: PageManagementProps) => {
    const options = await apiOptions({
      url: `${Config.BASE_URL}/api/createCms`,
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

  getAllCms: async (languageId: number, params?: any) => {
    const options = await apiOptions({
      url: `${Config.BASE_URL}/api/getAllCms/language/${languageId}`,
      method: 'get',
      params: params
    });
    return apiRequest(options);
  },

  getCmsById: async (cmsId: number) => {
    const options = await apiOptions({
      url: `${Config.BASE_URL}/api/getCmsById/${cmsId}`,
      method: 'get'
    });
    return apiRequest(options);
  },

  updateCms: async (
    cmsId: number,
    { data, successMessage, failureMessage }: PageManagementProps
  ) => {
    const options = await apiOptions({
      url: `${Config.BASE_URL}/api/updateCms/cms/${cmsId}`,
      method: 'patch',
      data: data
    });
    const toastMessageConfig = {
      success: { message: successMessage },
      failure: { message: failureMessage }
    };
    return apiRequest(options, toastMessageConfig);
  },

  deleteCms: async (
    cmsId: number,
    { successMessage, failureMessage }
  ) => {
    const options = await apiOptions({
      url: `${Config.BASE_URL}/api/deleteCms/${cmsId}`,
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
