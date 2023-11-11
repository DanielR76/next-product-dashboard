import { useMutation, useQuery } from '@tanstack/react-query';

import { deleteData, getData, setData } from '@services';
import { ErrorHTTP } from '@types';

interface Query<T> {
  url: string;
  queryKey: string[];
  enabled?: boolean;
  refetchOnWindowFocus?: boolean;
  onSuccess?: (arg: T) => void;
  onError?: (arg: ErrorHTTP) => void;
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

export const usePostData = <T extends Object>({ url, ...rest }: Mutation<T>) => {
  return useMutation({
    // @ts-expect-error
    mutationFn: (obj: Object) => setData(url, obj),
    ...rest,
  });
};

export const useDeleteData = <T extends Object>({ ...rest }: MutationDelete<T>) => {
  return useMutation({
    // @ts-expect-error
    mutationFn: (urlParam: string) => deleteData(urlParam),
    ...rest,
  });
};
