'use client';

import React, { FC, useId } from 'react';
import { mergeClasses } from '@utils';

interface InputProps {
  inputType?: 'input' | 'textarea';
  label: string;
  attrInput?: InputField;
  attrTextarea?: TextareaField;
}

interface InputField extends AttrInput {
  value: string | number;
}

interface TextareaField extends AttrTextArea {
  value: string | number;
}

export const Input: FC<InputProps> = ({ label, inputType = 'input', attrInput, attrTextarea }) => {
  const id = `${label}-${useId()}`;

  const defaultClassName = `
    block w-full
    py-1.5 rounded-md border-0
    text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 
    placeholder:text-gray-400 
    focus:(ring-2 ring-inset ring-indigo-600) 
    focus:sm:text-sm sm:leading-6`;

  return (
    <>
      <div className="sm:col-span-3">
        <label htmlFor={id} className="block text-sm font-medium leading-6 text-gray-900">
          {label}
        </label>

        <div className="mt-2">
          {inputType === 'input' && (
            <input
              name={label}
              className={mergeClasses(defaultClassName, attrInput?.className)}
              {...attrInput}
            />
          )}

          {inputType === 'textarea' && (
            <textarea
              name={label}
              className={mergeClasses(defaultClassName, attrTextarea?.className)}
              {...attrTextarea}
            />
          )}
        </div>
      </div>
    </>
  );
};
