import axios from 'axios';
import { DEFAULT_API_URL } from './constants';
import { getErrorMessage } from './erros';

export const apiClient = axios.create({
  baseURL: (process.env.NEXT_PUBLIC_API_URL || DEFAULT_API_URL) + '/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.data?.errorCode) {
      error.message = getErrorMessage(error.response.data.errorCode, "es");
    } else {
      error.message = getErrorMessage("UNKNOWN_ERROR", "es");
    }
    if (typeof window !== 'undefined') {
      return Promise.reject(error);
    }
    throw error;
  })
