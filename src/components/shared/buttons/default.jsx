import React from 'react';
import classNames from 'classnames';

export const Button = ({
  className,
  type = 'button',
  full = true,
  color = 'purple',
  ...rest
}) => {
  const styleClass = `group relative justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-${color}-600 hover:bg-${color}-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${color}-500`;
  return (
    <button
      className={classNames(styleClass, full && 'w-full', className)}
      type={type}
      {...rest}
    />
  );
};
