import { useMutation, useQuery } from '@tanstack/react-query';

import { deleteData, getData, setData } from '@services';

interface Query<T> {
  url: string;
  queryKey: string[];
  enabled?: boolean;
  refetchOnWindowFocus?: boolean;
  onSuccess?: (arg: T) => void;
  onError?: (arg: Response) => void;
}

interface Mutation<T> extends Omit<Query<T>, 'queryKey' | 'enabled' | 'refetchOnWindowFocus'> {}
interface MutationDelete<T> extends Omit<Mutation<T>, 'url'> {}

export const useGetData = <T extends Object>({
  queryKey,
  url,
  enabled = true,
  refetchOnWindowFocus = false,
  ...rest
}: Query<T>) => {
  return useQuery({
    queryKey,
    enabled,
    queryFn: () => getData(url),
    refetchOnWindowFocus,
    ...rest,
  });
};

export const usePostData = <T extends Object>({
  url,
  onSuccess,
  onError,
  ...rest
}: Mutation<T>) => {
  return useMutation({
    mutationFn: (obj: Object) => setData(url, obj),
    onSuccess,
    onError,
    ...rest,
  });
};

export const useDeleteData = <T extends Object>({
  onSuccess,
  onError,
  ...rest
}: MutationDelete<T>) => {
  return useMutation({
    mutationFn: (urlParam: string) => deleteData(urlParam),
    onSuccess,
    onError,
    ...rest,
  });
};
