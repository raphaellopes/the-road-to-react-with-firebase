import React from 'react';
import classNames from 'classnames';

export const Button = ({ className, ...rest }) => {
  const styleClass = 'group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500';
  return (
    <button
      className={classNames(styleClass, className)}
      {...rest}
    />
  );
};
