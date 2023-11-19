import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const mergeClasses = (...rest: ClassValue[]) => {
  return twMerge(clsx(rest));
};
