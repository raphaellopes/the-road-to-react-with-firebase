import React from 'react';

export const FormErrorBox = ({ children }) => (
  <p className="mt-2 text-center text-sm text-red-600 bg-red-100 border border-red-600 rounded-md p-2">
    {children}
  </p>
);
