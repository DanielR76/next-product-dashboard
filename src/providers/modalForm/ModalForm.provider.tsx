'use client';

import { FC, createContext, useState } from 'react';

interface ModalContextProps {
  openModal: boolean;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
}

export const ModalContext = createContext<ModalContextProps>({});

export const ProviderModal: FC<ChildrenProps> = ({ children }) => {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => setOpenModal(true);

  const handleCloseModal = () => setOpenModal(false);

  return (
    <ModalContext.Provider value={{ openModal, handleOpenModal, handleCloseModal }}>
      {children}
    </ModalContext.Provider>
  );
};
