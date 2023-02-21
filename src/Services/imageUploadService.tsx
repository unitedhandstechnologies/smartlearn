import { apiOptions } from 'src/Utils/apiOptions';
import { apiRequest } from 'src/Utils/apiRequest';
import { Config } from 'src/Config';

export const imageUploadService = {
  uploadImage: async (data: FormData) => {
    const options = await apiOptions({
      url: `${Config.BASE_URL}/api/upload`,
      method: 'post',
      data: data,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return apiRequest(options);
  }
};
