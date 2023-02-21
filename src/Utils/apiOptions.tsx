import { getToken } from './';
import { oldQueryMethod } from './';

type Props = {
  params?: any;
  url: string;
  method: string;
  noToken?: boolean;
  data?: any;
  headers?: any;
  filters?: any;
};

export const apiOptions = async ({
  params = {},
  url = '',
  method = 'get',
  noToken = false,
  data,
  headers,
  filters
}: Props) => {
  if (filters && !params?.query) {
    params = { ...params, query: oldQueryMethod(filters) };
  }

  const options: any = {
    method: method,
    url: url,
    headers: {
      'Content-Type': 'application/json'
    },
    params
  };

  if (headers) {
    options.headers = { ...options.headers, ...headers };
  }

  if (!noToken) {
    const userToken = await getToken();
    options.headers.Authorization = `Bearer ${userToken}`;
  }

  switch (options.method) {
    case 'post':
    case 'patch':
    case 'put':
      return {
        ...options,
        data
      };
    case 'delete':
    case 'get':
    default:
      return options;
  }
};
