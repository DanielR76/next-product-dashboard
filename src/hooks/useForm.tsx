import { useState } from 'react';

export const useForm = <T extends Object>(initialValue: T) => {
  const [values, setValue] = useState({ ...initialValue });

  const handleChangeInput = (event: EventInput) => {
    const { value, name } = event.target;
    const data = { ...values, [name]: value };
    setValue(data);
  };

  return { values, handleChangeInput };
};
