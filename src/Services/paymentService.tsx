import { apiOptions } from 'src/Utils/apiOptions';
import { apiRequest } from 'src/Utils/apiRequest';
import { Config } from 'src/Config';

type PaymentProps = {
  data?: any;
  successMessage?: string;
  failureMessage?: string;
};

export const paymentService = {
  create: async ({ data, successMessage, failureMessage }: PaymentProps) => {
    const options = await apiOptions({
      url: `${Config.BASE_URL}/api/createPayment`,
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

  update: async ({ data, successMessage, failureMessage }: PaymentProps) => {
    const options = await apiOptions({
      url: `http://localhost:5000/api/verifyPayment`,
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
  }

};
