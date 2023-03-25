import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API,
  headers: {
    Accept: '*/*',
    'Content-Type': 'application/json',
  },
});