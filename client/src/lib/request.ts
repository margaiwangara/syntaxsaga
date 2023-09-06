import axios, { Method, AxiosRequestConfig } from 'axios';

const BASE_URL = 'http://localhost:8000/api';

export function apiRequest(
  method: Method,
  path: string,
  data?: any,
  config?: AxiosRequestConfig,
) {
  return new Promise((resolve, reject) => {
    return axios({
      method,
      baseURL: BASE_URL,
      url: path,
      data,
      withCredentials: true,
      ...config,
    })
      .then((res) => resolve(res.data))
      .catch((error) => reject(error?.response?.data));
  });
}
