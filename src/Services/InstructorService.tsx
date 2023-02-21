import { apiOptions } from 'src/Utils/apiOptions';
import { apiRequest } from 'src/Utils/apiRequest';
import { Config } from 'src/Config';


type MentorDetailsProp = {
  data: any;
  successMessage?: string;
  failureMessage?: string;
};
export const instructorService = {
  create: async (
    mentor_id,
    { data, successMessage, failureMessage }: MentorDetailsProp
  ) => {
    const options = await apiOptions({
      url: `${Config.BASE_URL}/api/createMentorCommissionSettings/mentor/${mentor_id}`,
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
    // return InstructorSettingData.createInstructorSetting;
  },

  getAllMentorCommissionSettings: async () => {
    const options = await apiOptions({
      url: `${Config.BASE_URL}/api/getAllMentorCommissionSettings`,
      method: 'get',
    });
    return apiRequest(options);
  },

  update: async (id, { data, successMessage}) => {
    const options = await apiOptions({
      url: `${Config.BASE_URL}/api/updateMentorCommissionSettings/${id}`,
      method: 'patch',
      data: data
    });
    const toastMessageConfig = {
      success: {
        message: successMessage
      }
    };
    return apiRequest(options, toastMessageConfig);
    // return InstructorSettingData.updateInstructorSetting;
  }
};
