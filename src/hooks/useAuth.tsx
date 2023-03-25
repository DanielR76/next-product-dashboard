'use client';
import { useState, createContext, useContext, FC } from 'react';
import { useQuery } from '@tanstack/react-query';
import Cookies from 'js-cookie';

import { axiosInstance, endpoints } from 'app/api/services';

interface IArg {
  email: string;
  password: string;
}

interface IPropsContext {
  user: string;
  signIn: ({ email, password }: IArg) => void;
}

interface IPropsProvider {
  children: React.ReactNode;
}

const initValue = {
  user: '',
  signIn: () => {},
};

const AuthContext = createContext<IPropsContext>(initValue);

export const ProviderAuth: FC<IPropsProvider> = ({ children }) => {
  const user = useProviderAuth();
  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

export const useProviderAuth = () => {
  const [user, setUser] = useState<string>('');

  const signIn = async (data: IArg) => {
    try {
      const {
        data: { access_token },
      } = await axiosInstance.post(endpoints.auth.login, data);
      if (access_token) Cookies.set('token', access_token);
    } catch (e) {
      console.log('error', e);
    }
  };

  return { user, signIn };
};