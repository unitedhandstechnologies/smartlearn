import axios from 'axios';
import handleErrorCase from './handleErrorCase';
import toast from 'react-hot-toast';
import { HTTP_STATUSES } from 'src/Config/constant';

const axiosInstance = axios.create({
  timeout: 30000
});

const reportSuccess = (result, url, toastMessage) => {
  const obj = {
    endpoint: url,
    message: 'Success',
    error: false,
    data: result?.data,
    statusCode: result?.status,
    response: result
  };
  let successMessage = toastMessage?.message;
  // ?? result?.data?.message;
  if (successMessage) {
    toast.success(successMessage);
  }
  if (process.env.NODE_ENV !== 'production') {
    console.log('Network Response: ', obj);
  }
};

const reportCancel = (error, url) => {
  const obj = {
    endpoint: url,
    message: 'Cancelled',
    error: false,
    data: null,
    statusCode: null,
    response: error
  };

  if (process.env.NODE_ENV !== 'production') {
    console.log('Request Canceled: ', obj);
  }
};

export const apiRequest = async (request, toastMessageConfig = null) => {
  //   if (process.env.NODE_ENV === 'development') {
  //     const loggedRequest = { ...request, data: toJS(request.data) };
  //     console.log('Requesting...', loggedRequest);
  //   }

  try {
    const result = await axiosInstance(request);

    if (result?.status < HTTP_STATUSES.BAD_REQUEST) {
      if (typeof toastMessageConfig === 'string') {
        toastMessageConfig = {
          success: {
            message: toastMessageConfig
          }
        };
      }
      reportSuccess(result, request.url, toastMessageConfig?.success);
      return result;
    }
  } catch (error) {
    if (axios.isCancel(error)) {
      reportCancel(error, request.url);
      return {
        canceled: true,
        request,
        message: 'This request was cancelled'
      };
    }

    return handleErrorCase(error, request, toastMessageConfig?.failure);
  }
};
