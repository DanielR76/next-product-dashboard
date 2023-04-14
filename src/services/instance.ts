import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API,
  headers: {
    Accept: '*/*',
    'Content-Type': 'application/json',
  },
});

export const getData = async (url: string): Promise<any> => {
  const response = await axiosInstance.get(url);
  return response.data;
};

export const setData = async <T>(url: string, data?: T): Promise<any> => {
  const response = await axiosInstance.post(url, data);
  return response.data;
};
