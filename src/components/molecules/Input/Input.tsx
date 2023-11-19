'use client';

import { mergeClasses } from '@utils';
import React, { FC, useId } from 'react';

interface InputProps extends AttrInputTexArea {
  autoComplete?: string;
  defaultValue?: string | number | undefined;
  inputtype?: 'text' | 'number' | 'email' | 'password';
  isDisabled?: boolean;
  label: string;
  required?: boolean;
  textareaRows?: number;
  type?: 'input' | 'textarea';
  value: string | number;
  onChange: (str: EventInput | EventTextArea) => void;
}

export const Input: FC<InputProps> = ({
  autoComplete = 'off',
  className,
  defaultValue,
  inputtype = 'text',
  isDisabled,
  label,
  required,
  textareaRows = 3,
  type = 'input',
  value,
  onChange,
}) => {
  const id = `${label}-${useId()}`;

  const defaultClassName = `
    block w-full
    py-1.5 rounded-md border-0
    text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 
    placeholder:text-gray-400 
    focus:(ring-2 ring-inset ring-indigo-600) 
    focus:sm:text-sm sm:leading-6`;

  const props = {
    id,
    name: label,
    defaultValue,
    value,
    autoComplete,
    disabled: isDisabled,
    required,
    className: mergeClasses(defaultClassName, className),
    onChange,
  };

  return (
    <>
      <div className="sm:col-span-3">
        <label htmlFor={id} className="block text-sm font-medium leading-6 text-gray-900">
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
