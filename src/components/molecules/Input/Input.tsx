'use client';

import { FC, useId } from 'react';

interface InputProps {
  defaultValue: string | number | undefined;
  label: string;
  type?: 'text' | 'number';
  value: string | number;
  onChange: (str: EventInput) => void;
}

export const Input: FC<InputProps> = ({ label, value, defaultValue, onChange, type = 'text' }) => {
  const id = useId();
  const testid = `${label}-${id}`;

  return (
    <>
      <div className="sm:col-span-3">
        <label htmlFor={testid} className="block text-sm font-medium leading-6 text-gray-900">
          {label}
        </label>

        <div className="mt-2">
          <input
            id={testid}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            type={type}
            name={label}
            defaultValue={defaultValue}
            value={value}
            autoComplete="off"
            onChange={onChange}
          />
        </div>
      </div>
    </>
  );
};
