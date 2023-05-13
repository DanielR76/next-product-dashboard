import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API,
  headers: {
    Accept: '*/*',
    'Content-Type': 'application/json',
  },
});

export const getData = async (url: string): Promise<unknown> => {
  const response = await axiosInstance.get(url);
  return response.data;
};

export const setData = async <T extends Object>(url: string, data?: T): Promise<unknown> => {
  const response = await axiosInstance.post(url, data);
  return response.data;
};

export const deleteData = async (url: string): Promise<unknown> => {
  const response = await axiosInstance.delete(url);
  return response.data;
};

export const updateData = async <T extends Object>(url: string, data?: T): Promise<unknown> => {
  const response = await axiosInstance.put(url, data);
  return response.data;
};
