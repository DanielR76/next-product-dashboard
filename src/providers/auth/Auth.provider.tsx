import { FC, createContext } from 'react';
import { UseQueryResult } from '@tanstack/react-query';

import { useFetchAuth } from '@hooks';
import { User } from '@types';

export interface AuthContextProps {
  authData: UseQueryResult<User>;
  handleToken: (arg: string) => void;
  logoutUser: () => void;
}

export const AuthContext = createContext<Partial<AuthContextProps>>({});

export const ProviderAuth: FC<ChildrenProps> = ({ children }) => {
  const auth = useFetchAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
