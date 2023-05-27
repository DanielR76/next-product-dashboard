'use client';

import { createContext, useContext, FC, useState } from 'react';
import Cookies from 'js-cookie';
import { UseQueryResult } from '@tanstack/react-query';

import { axiosInstance, endpoints } from '@services';
import { useGetData } from '@hooks';

interface AuthContext {
  authData: UseQueryResult<User>;
  handleToken: (arg: string) => void;
  logoutUser: () => void;
}

interface User {
  id: number;
  role: string;
  creationAt: string;
  avatar: string;
  email: string;
  name: string;
  password: string;
  updatedAt: string;
}

const AuthContext = createContext<AuthContext>({});

export const ProviderAuth: FC<ChildrenProps> = ({ children }) => {
  const auth = useProviderAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useProviderAuth = () => {
  const [token, setToken] = useState('');

  const authData = useGetData<User>({
    queryKey: ['profile'],
    url: endpoints.auth.profile,
    enabled: Boolean(token),
  });

  const handleToken = (token: string) => {
    Cookies.set('token', token);
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
    setToken(token);
  };

  const logoutUser = () => {
    setToken('');
    Cookies.remove('token');
    delete axiosInstance.defaults.headers.common.Authorization;
    window.location.href = '/login';
  };

  return { authData, handleToken, logoutUser };
};

export const useAuth = () => useContext(AuthContext);
