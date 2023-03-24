'use client';
import { useState, createContext, useContext, FC } from 'react';

interface IPropsContext {
  user: string;
  signIn: () => void;
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

  const signIn = (email: string, pass: string) => {
    console.log(email);
    console.log(pass);
    setUser('hello');
  };

  return { user, signIn };
};
