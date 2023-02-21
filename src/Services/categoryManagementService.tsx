import { apiOptions } from 'src/Utils/apiOptions';
import { apiRequest } from 'src/Utils/apiRequest';
import { Config } from 'src/Config';
import {
  categoryData,
  createCategory,
  subCategoryData
} from './Stub/categoryStub';

type CategoryProps = {
  data: any;
  successMessage?: string;
  failureMessage?: string;
};
export const categoryManagementService = {
  create: async ({ data, successMessage, failureMessage }: CategoryProps) => {
    const options = await apiOptions({
      url: `${Config.BASE_URL}/api/createCategory`,
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
    //return createCategory.createData;
  },
  getAllCategory: async (languageId: number, params?: any) => {
    const options = await apiOptions({
      url: `${Config.BASE_URL}/api/getAllCategory/language/${languageId}`,
      method: 'get',
      params: params
    });
    return apiRequest(options);
    //return categoryData.categoryDataGet
  },

  getAllCategoryNoPermission: async (languageId: number, params?: any) => {
    const options = await apiOptions({
      url: `${Config.BASE_URL}/api/getAllCategorys/language/${languageId}`,
      method: 'get',
      params: params
    });
    return apiRequest(options);
    //without Permission
  },

  

  getCategoryById: async (categoryId: number) => {
    const options = await apiOptions({
      url: `${Config.BASE_URL}/api/getCategoryById/${categoryId}`,
      method: 'get'
    });
    return apiRequest(options);
  },

  updateCategory: async (
    categoryId: number,
    { data, successMessage, failureMessage }: CategoryProps
  ) => {
    const options = await apiOptions({
      url: `${Config.BASE_URL}/api/updateCategory/category/${categoryId}`,
      method: 'patch',
      data: data
    });
    const toastMessageConfig = {
      success: { message: successMessage },
      failure: { message: failureMessage }
    };
    return apiRequest(options, toastMessageConfig);
  },

  delete: async (
    categoryId: number,
    {
      successMessage,
      failureMessage
    }: {
      successMessage?: string;
      failureMessage?: string;
    }
  ) => {
    const options = await apiOptions({
      url: `${Config.BASE_URL}/api/deleteCategory/${categoryId}`,
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
  },
  createSubCategory: async (
    categoryId: number,
    { data, successMessage, failureMessage }: CategoryProps
  ) => {
    const options = await apiOptions({
      url: `${Config.BASE_URL}/api/createSubCategory/category/${categoryId}`,
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
  getAllSubCategory: async (languageId: number, params?: any) => {
    const options = await apiOptions({
      url: `${Config.BASE_URL}/api/getAllSubCategory/language/${languageId}`,
      method: 'get',
      params: params
    });
    return apiRequest(options);
    //return subCategoryData.subCategoryDataGet
  },
  getAllSubCategoryByCategoryId: async (
    languageId: number,
    category_id: number,
    language_id: number
  ) => {
    const options = await apiOptions({
      url: `${Config.BASE_URL}/api/getAllSubCategory/language/${languageId}`,
      method: 'get',
      params: { category_id, language_id }
    });
    return apiRequest(options);
    //return subCategoryData.subCategoryDataGet
  },

  getAllSubCategoryByCategoryIdNoPermission: async (
    languageId: number,
    category_id: number,
    language_id: number
  ) => {
    const options = await apiOptions({
      url: `${Config.BASE_URL}/api/getAllSubCategorys/language/${languageId}`,
      method: 'get',
      params: { category_id, language_id }
    });
    return apiRequest(options);
    //return subCategoryData.subCategoryDataGet
  },


  getSubCategoryById: async (subCategoryId: number) => {
    const options = await apiOptions({
      url: `${Config.BASE_URL}/api/getSubCategoryById/${subCategoryId}`,
      method: 'get'
    });
    return apiRequest(options);
  },
  updateSubCategory: async (
    subCategoryId: number,
    { data, successMessage, failureMessage }: CategoryProps
  ) => {
    const options = await apiOptions({
      url: `${Config.BASE_URL}/api/updateSubCategory/sub_category/${subCategoryId}`,
      method: 'patch',
      data: data
    });
    const toastMessageConfig = {
      success: { message: successMessage },
      failure: { message: failureMessage }
    };
    return apiRequest(options, toastMessageConfig);
  },
  deleteSubCategory: async (
    subCategoryId: number,
    {
      successMessage,
      failureMessage
    }: {
      successMessage?: string;
      failureMessage?: string;
    }
  ) => {
    const options = await apiOptions({
      url: `${Config.BASE_URL}/api/deleteSubCategory/${subCategoryId}`,
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
