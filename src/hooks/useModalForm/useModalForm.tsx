'use client';

import { useContext } from 'react';
import { ModalContext, ModalContextProps } from '@providers';

export const useModalForm = () => useContext(ModalContext) as ModalContextProps;
