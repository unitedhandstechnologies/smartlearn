import { apiOptions } from 'src/Utils/apiOptions';
import { apiRequest } from 'src/Utils/apiRequest';
import { Config } from 'src/Config';

export const videoUploadService = {
  uploadVideo: async (data: FormData) => {
    const options = await apiOptions({
      url: `${Config.BASE_URL}/api/uploadVideo`,
      method: 'post',
      data: data,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return apiRequest(options);
  }
};
