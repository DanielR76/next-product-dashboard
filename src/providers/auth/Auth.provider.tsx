'use client';

import { FC, createContext} from 'react';
import { UseQueryResult } from '@tanstack/react-query';

import { useFetchAuth } from '@hooks';
import { User } from '@types';

interface AuthContext {
  authData: UseQueryResult<User>;
  handleToken: (arg: string) => void;
  logoutUser: () => void;
}

export const AuthContext = createContext<AuthContext>({});

export const ProviderAuth: FC<ChildrenProps> = ({ children }) => {
  const auth = useFetchAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
