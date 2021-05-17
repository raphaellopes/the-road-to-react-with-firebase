import React from 'react';
import classNames from 'classnames';

export const Input = ({ id, label, className, type = 'text', ...rest }) => {
  const  styleClass = 'appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm';
  return (
    <div>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input
        type={type}
        className={classNames(styleClass, className)}
        placeholder={label}
        {...rest}
      />
    </div>
  );
}
