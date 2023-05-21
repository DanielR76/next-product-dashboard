import { useMutation, useQuery } from '@tanstack/react-query';

import { deleteData, getData, setData } from '@services';

interface Query /* extends ReturnType<typeof useQuery> */ {
  url: string;
  queryKey: string[];
  enabled?: boolean;
  refetchOnWindowFocus?: boolean;
  onSuccess?: (arg: unknown) => unknown;
  onError?: (arg: unknown) => unknown;
}

interface Mutation extends Omit<Query, 'queryKey' | 'enabled' | 'refetchOnWindowFocus'> {}
interface MutationDelete extends Omit<Mutation, 'url'> {}

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

export const useDeleteData = ({ onSuccess, onError, ...props }: MutationDelete) => {
  return useMutation({
    mutationFn: (urlParam: string) => deleteData(urlParam),
    onSuccess,
    onError,
    ...props,
  });
};
