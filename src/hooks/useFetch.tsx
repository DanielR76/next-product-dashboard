import { useQuery } from '@tanstack/react-query';

import { axiosInstance } from 'services';

export const useFetch = (endpoint: string) => {
  return useQuery({ queryKey: ['hello'], queryFn: () => axiosInstance.get(endpoint).then((response) => response.data) });
};
