'use client';
import { useState, createContext, useContext, FC } from 'react';
import Cookies from 'js-cookie';
import { useMutation } from '@tanstack/react-query';

import { axiosInstance, endpoints } from 'services';

interface IArg {
  email: string;
  password: string;
}

const AuthContext = createContext({});

export const ProviderAuth: FC<IChildrenProps> = ({ children }) => {
  const auth = useProviderAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

const signIn = async (dataAuth: IArg) => {
  try {
    const {
      data: { access_token },
    } = await axiosInstance.post(endpoints.auth.login, dataAuth);
    if (access_token) Cookies.set('token', access_token);
  } catch (e) {
    console.log('error', e);
  }
};

export const useProviderAuth = () => {
  const query = useMutation({ mutationFn: (dataAuth: IArg) => signIn(dataAuth) });

  return query;
};
