import { useMutation, useQuery } from '@tanstack/react-query';

import { getData, setData } from 'services';

interface Query /* extends ReturnType<typeof useQuery> */ {
  queryKey: string[];
  url: string;
  enabled?: boolean;
  refetchOnWindowFocus?: boolean;
  onSuccess?: (arg: any) => any;
  onError?: (arg: any) => any;
}

interface Mutation /* extends Parameters<typeof useMutation> */ {
  url: string;
  onSuccess?: (arg: any) => void;
  onError?: (arg: any) => void;
}

export const useGetData = ({
  queryKey,
  url,
  enabled = true,
  refetchOnWindowFocus = false,
  ...props
}: Query) => {
  return useQuery({
    queryKey,
    queryFn: () => getData(url),
    enabled,
    refetchOnWindowFocus,
    ...props,
  });
};

export const usePostData = ({ url, onSuccess, onError, ...props }: Mutation) => {
  return useMutation({
    mutationFn: (obj: Object) => setData(url, obj),
    onSuccess,
    onError,
    ...props,
  });
};
