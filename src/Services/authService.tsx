import { apiOptions } from 'src/Utils/apiOptions';
import { apiRequest } from 'src/Utils/apiRequest';
import { Config } from 'src/Config';

type LoginProp = {
  data: { user_name: string; password: string };
  successMessage?: string;
  failureMessage?: string;
};
export const authService = {
  userLogin: async ({ data, successMessage, failureMessage }: LoginProp) => {
    const options = await apiOptions({
      url: `${Config.BASE_URL}/api/LoginUser`,
      method: 'post',
      data: data,
      noToken: true
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
