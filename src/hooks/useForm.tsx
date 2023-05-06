import { useState } from 'react';

type EventForm = EventInput | EventTextArea | EventSelect;

interface ReturnForm<T> {
  values: T;
  handleChangeInput: (event: EventForm) => void;
}

export const useForm = <T extends Object>(initialValue: T): ReturnForm<T> => {
  const [values, setValue] = useState({ ...initialValue });

  const handleChangeInput = (event: EventForm) => {
    const { value, name } = event.target;
    const data = { ...values, [name]: value };
    setValue(data);
  };

  return { values, handleChangeInput };
};
