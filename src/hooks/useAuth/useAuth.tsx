'use client';

import { useContext } from 'react';
import { AuthContext, AuthContextProps } from '@providers';

export const useAuth = () => useContext(AuthContext) as AuthContextProps;
