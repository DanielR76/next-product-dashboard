import React, { useState } from 'react';

type event = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

export const useForm = <T extends Object>(initialValue: T) => {
  const [values, setValue] = useState({ ...initialValue });

  const handleChangeInput = (event: event) => {
    const { value, name } = event.target;
    const data = { ...values, [name]: value };
    setValue(data);
  };

  return { values, handleChangeInput };
};
