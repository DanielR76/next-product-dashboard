import { useState } from 'react';
import Cookies from 'js-cookie';

import { axiosInstance, endpoints } from '@services';
import { useGetData } from '@hooks';
import { User } from '@types';

export const useFetchAuth = () => {
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
