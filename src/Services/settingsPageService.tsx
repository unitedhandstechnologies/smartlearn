import { apiOptions } from 'src/Utils/apiOptions';
import { apiRequest } from 'src/Utils/apiRequest';
import { Config } from 'src/Config';

type defaultProps = {
  data: any;
  successMessage?: string;
  failureMessage?: string;
};

export const settingsPageService = {
  getAppConfiguration: async () => {
    const options = await apiOptions({
      url: `${Config.BASE_URL}/api/getAllConfiguration`,
      method: 'get'
    });
    return apiRequest(options);
  },
  updateAppConfiguration: async (
    id: number,
    { data, successMessage, failureMessage }: defaultProps
  ) => {
    const options = await apiOptions({
      url: `${Config.BASE_URL}/api/updateConfiguration/${id}`,
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

  getSmtpConfiguration: async () => {
    const options = await apiOptions({
      url: `${Config.BASE_URL}/api/getAllSmtp`,
      method: 'get'
    });
    return apiRequest(options);
  },
  updateSmtpConfiguration: async (
    id: number,
    { data, successMessage, failureMessage }: defaultProps
  ) => {
    const options = await apiOptions({
      url: `${Config.BASE_URL}/api/updateSmtp/${id}`,
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
  getNotificationConfiguration: async () => {
    const options = await apiOptions({
      url: `${Config.BASE_URL}/api/getAllNotification`,
      method: 'get'
    });
    return apiRequest(options);
  },
  updateNotificationConfiguration: async (
    id: number,
    { data, successMessage, failureMessage }: defaultProps
  ) => {
    const options = await apiOptions({
      url: `${Config.BASE_URL}/api/updateNotification/${id}`,
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
  getSmsConfiguration: async () => {
    const options = await apiOptions({
      url: `${Config.BASE_URL}/api/getAllSms`,
      method: 'get'
    });
    return apiRequest(options);
  },
  updateSmsConfiguration: async (
    id: number,
    { data, successMessage, failureMessage }: defaultProps
  ) => {
    const options = await apiOptions({
      url: `${Config.BASE_URL}/api/updateSms/${id}`,
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
  }
};
