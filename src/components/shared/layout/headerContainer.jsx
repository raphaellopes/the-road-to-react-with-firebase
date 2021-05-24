import React from 'react';

export const HeaderContainer = ({ children }) => (
  <header className="mt-16 bg-white shadow">
    <div className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900">
        {children}
      </h1>
    </div>
  </header>
);
