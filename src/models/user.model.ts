import { User } from '@types';

export const userModel = (data?: Partial<User>): User => ({
  id: data?.id || 0,
  role: data?.role || '',
  creationAt: data?.creationAt || '',
  avatar: data?.avatar || '',
  email: data?.email || '',
  name: data?.name || '',
  password: data?.password || '',
  updatedAt: data?.updatedAt || '',
});
