import { apiOptions } from 'src/Utils/apiOptions';
import { apiRequest } from 'src/Utils/apiRequest';
import { Config } from 'src/Config';

type PayoutProps = {
  data: any;
  successMessage?: string;
  failureMessage?: string;
};
export const instructorReportsService = {
  getAllInstructorReports: async (params?: any) => {
    const options = await apiOptions({
      url: `${Config.BASE_URL}/api/getAllMentorPayouts`,
      method: 'get',
      params: params
    });
    return apiRequest(options);
  },
  getAllPaymentHistory: async (mentorId: number) => {
    const options = await apiOptions({
      url: `${Config.BASE_URL}/api/getPaymentHistory/mentor/${mentorId}`,
      method: 'get'
    });
    return apiRequest(options);
  },
  update: async (id, { data, successMessage }: PayoutProps) => {
    const options = await apiOptions({
      url: `${Config.BASE_URL}/api/updateMentorPayouts/${id}`,
      method: 'patch',
      data: data
    });
    const toastMessageConfig = {
      success: {
        message: successMessage
      }
    };
    return apiRequest(options, toastMessageConfig);
  }
};
