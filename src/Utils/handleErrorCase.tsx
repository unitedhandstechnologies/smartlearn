import toast from 'react-hot-toast';

const reportIssue = (error, url, toastMessage) => {
  const errorObj = {
    message: error?.response?.data?.message,
    endpoint: url,
    error: true,
    code: error?.code,
    status: error?.response?.status,
    statusCode: error?.response?.status,
    errorBody:
      error?.response?.data?.message ||
      'An error occured while updating or retrieving data'
  };

  if (process.env.NODE_ENV === 'development') {
    console.log('Network Error: ', errorObj);
  }
  let failureMessage = toastMessage?.message ?? errorObj.errorBody;
  if (failureMessage) {
    toast.error(failureMessage);
  }
  return errorObj;
};

// const handle401 = () => {
//   navigate('Login');
// };

const handleErrorCase = (error, request, toastMessage = null) => {
  if (error?.response) {
    const { status } = error.response;

    if (status === 401) {
      console.log('------status----401-------');
      // handle401();
    }
  } else if (error?.request) {
    console.log(error.request, '-----error.request------');
  }

  return reportIssue(error, request.url, toastMessage);
};

export default handleErrorCase;
