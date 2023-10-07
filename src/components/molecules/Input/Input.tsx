'use client';

import { FC, useId } from 'react';

interface InputProps {
  defaultValue?: string | number | undefined;
  inputtype?: 'text' | 'number';
  label: string;
  textareaRows?: number;
  type?: 'input' | 'textarea';
  value: string | number;
  onChange: (str: EventInput | EventTextArea) => void;
}

export const Input: FC<InputProps> = ({
  defaultValue,
  inputtype = 'text',
  label,
  textareaRows = 3,
  type = 'input',
  value,
  onChange,
}) => {
  const id = useId();
  const testid = `${label}-${id}`;

  const props = {
    id: testid,
    className:
      'block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6',
    name: label,
    defaultValue,
    value,
    autoComplete: 'off',
    onChange,
  };

  return (
    <>
      <div className="sm:col-span-3">
        <label htmlFor={testid} className="block text-sm font-medium leading-6 text-gray-900">
          {label}
        </label>

        <div className="mt-2">
          {type === 'input' && <input {...props} type={inputtype} />}

          {type === 'textarea' && <textarea {...props} rows={textareaRows} />}
        </div>
      </div>
    </>
  );
};
