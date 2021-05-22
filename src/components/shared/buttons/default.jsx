import React from 'react';
import classNames from 'classnames';

export const Button = ({ className, type = 'button', full = true, ...rest }) => {
  const styleClass = 'group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500';
  return (
    <button
      className={classNames(styleClass, full && 'w-full', className)}
      type={type}
      {...rest}
    />
  );
};
