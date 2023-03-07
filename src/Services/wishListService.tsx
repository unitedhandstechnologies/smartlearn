import React from 'react';
import { Config } from 'src/Config';
import { apiOptions } from 'src/Utils/apiOptions';
import { apiRequest } from 'src/Utils/apiRequest';

export const WishListService = {
  create: async (
    studentId: number,
    courseId: number,
    {
      successMessage,
      failureMessage
    }: { successMessage?: string; failureMessage?: string }
  ) => {
    const options = await apiOptions({
      url: `${Config.BASE_URL}/api/user/${studentId}/wishlist/course/${courseId}`,
      method: 'post'
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
  getAllWishlist: async (studentId: number, languageId: number) => {
    const options = await apiOptions({
      url: `${Config.BASE_URL}/api/getAllWishList/user/${studentId}/language/${languageId}`,
      method: 'get'
    });
    return apiRequest(options);
  },
  getByWishlistId: async (id: number) => {
    const options = await apiOptions({
      url: `${Config.BASE_URL}/api/getWishListById/${id}`,
      method: 'get'
    });
    return apiRequest(options);
  },
  delete: async (userId: number, courseId: number) => {
    const options = await apiOptions({
      url: `${Config.BASE_URL}/api/deleteWishlist/user/${userId}/course/${courseId}`,
      method: 'delete'
    });
    return apiRequest(options);
  }
};
