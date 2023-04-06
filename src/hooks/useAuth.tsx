'use client';
import { createContext, useContext, FC } from 'react';
import Cookies from 'js-cookie';
import { useMutation, UseMutationResult } from '@tanstack/react-query';

import { axiosInstance, endpoints } from 'services';

interface IArg {
  email: string;
  password: string;
}

const AuthContext = createContext<UseMutationResult<IArg>>({});

export const ProviderAuth: FC<IChildrenProps> = ({ children }) => {
  const auth = useProviderAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

const signIn = async (dataAuth: IArg) => {
  const {
    data: { access_token },
  } = await axiosInstance.post(endpoints.auth.login, dataAuth);
  if (access_token) {
    Cookies.set('token', access_token);
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
    const { data } = await axiosInstance.get(endpoints.auth.profile);
    return data;
  }
};

export const useProviderAuth = () => {
  const query = useMutation({
    mutationFn: (dataAuth: IArg) => signIn(dataAuth),
  });

  return query;
};
