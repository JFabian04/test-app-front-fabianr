import axios from 'axios';
import {  DEFAULT_API_URL } from './constants';

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || DEFAULT_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


apiClient.interceptors.response.use(
  (response) => response,
  (error) =>  Promise.reject(error)
);
