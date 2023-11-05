'use client';

import { useContext } from 'react';
import { ModalContext } from '@providers';

export const useModalForm = () => useContext(ModalContext);
