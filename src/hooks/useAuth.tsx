'use client';

import { createContext, useContext, FC, useState } from 'react';
import Cookies from 'js-cookie';
import { UseQueryResult } from '@tanstack/react-query';

import { axiosInstance, endpoints } from 'services';
import { useGetData } from './useFetchData';

interface IArg {
  authData: UseQueryResult<IResponse>;
  handleToken: (arg: string) => void;
}

interface IResponse {
  id: number;
  role: string;
  creationAt: string;
  avatar: string;
  email: string;
  name: string;
  password: string;
  updatedAt: string;
}

const AuthContext = createContext<IArg>({});

export const ProviderAuth: FC<ChildrenProps> = ({ children }) => {
  const auth = useProviderAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useProviderAuth = () => {
  const [token, setToken] = useState('');

  const authData = useGetData({
    queryKey: ['profile'],
    url: endpoints.auth.profile,
    enabled: Boolean(token),
  });

  const handleToken = (token: string) => {
    Cookies.set('token', token);
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
    setToken(token);
  };

  return { authData, handleToken };
};

export const useAuth = () => useContext(AuthContext);
