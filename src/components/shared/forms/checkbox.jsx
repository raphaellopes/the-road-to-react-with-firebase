import React from 'react';
import classNames from 'classnames';

export const Checkbox = ({ id, label, className, ...rest }) => {
  const  styleClass = 'appearance-none rounded text-purple-500';
  return (
    <div>
      <input
        id={id}
        type="checkbox"
        className={classNames(styleClass, className)}
        {...rest}
      />
      <label htmlFor={id} className="p-2 text-sm font-medium text-gray-500">
        {label}
      </label>
    </div>
  );
}
