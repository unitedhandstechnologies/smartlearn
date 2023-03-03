import { apiOptions } from 'src/Utils/apiOptions';
import { apiRequest } from 'src/Utils/apiRequest';
import { Config } from 'src/Config';

export type CartProps = {
    course_id: number;
    language_id: number;
    user_id: number;
    tax: number;
    total: number;
    id?: number;
}
type AddTOCartProps = {
  data: CartProps;
  successMessage?: string;
  failureMessage?: string;
};
export const AddToCartService = {
  create: async ({ data, successMessage, failureMessage }: AddTOCartProps) => {
    const options = await apiOptions({
      url: `${Config.BASE_URL}/api/createAddToCart`,
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
  getAllAddToCart: async (studentId: number) => {
    const options = await apiOptions({
      url: `${Config.BASE_URL}/api/getAllAddToCart/${studentId}`,
      method: 'get'
    });
    return apiRequest(options);
  },
  getByIdAddToCart: async (id: number) => {
    const options = await apiOptions({
      url: `${Config.BASE_URL}/api/getByIdAddToCart/${id}`,
      method: 'get'
    });
    return apiRequest(options);
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
      url: `${Config.BASE_URL}/api/deleteAddToCart/${id}`,
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
