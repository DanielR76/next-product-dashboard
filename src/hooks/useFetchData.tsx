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

interface QueryTest<T> {
  url: string;
  queryKey: string[];
  enabled?: boolean;
  refetchOnWindowFocus?: boolean;
  onSuccess?: (arg: T) => void;
  onError?: (arg: Error) => void;
}

interface Mutation extends Omit<Query, 'queryKey' | 'enabled' | 'refetchOnWindowFocus'> {}
interface MutationDelete extends Omit<Mutation, 'url'> {}

export const useGetData = <T extends Object>({
  queryKey,
  url,
  enabled = true,
  refetchOnWindowFocus = false,
  ...rest
}: QueryTest<T>) => {
  return useQuery({
    queryKey,
    enabled,
    queryFn: () => getData(url),
    refetchOnWindowFocus,
    ...rest,
  });
};

export const usePostData = ({ url, onSuccess, onError, ...rest }: Mutation) => {
  return useMutation({
    mutationFn: (obj: Object) => setData(url, obj),
    onSuccess,
    onError,
    ...rest,
  });
};

export const useDeleteData = ({ onSuccess, onError, ...rest }: MutationDelete) => {
  return useMutation({
    mutationFn: (urlParam: string) => deleteData(urlParam),
    onSuccess,
    onError,
    ...rest,
  });
};
