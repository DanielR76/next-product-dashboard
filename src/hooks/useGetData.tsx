import { useQuery } from '@tanstack/react-query';

import { getData } from 'services';

interface IProps extends Parameters<typeof useQuery> {
  endpoint: string;
}

export const useGetData = ({ queryKey, queryFn, enabled = true, refetchOnWindowFocus = false }) => {
  return useQuery({ queryKey, queryFn: () => getData(queryFn), enabled, refetchOnWindowFocus });
};
