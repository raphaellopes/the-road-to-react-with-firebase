import React from 'react';
import { Link } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';

// @TODO: Refactoring style
const Navigation = () => {
  const getSelectedPageClass = selected => selected
    ? 'bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium'
    : 'text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium';

  const renderLinks = (
    <div className="hidden md:block">
      <div className="ml-10 flex items-baseline space-x-4">
        <Link
          to={ROUTES.LANDING}
          className={getSelectedPageClass(true)}
        >
          Landing
        </Link>
        <Link
          to={ROUTES.HOME}
          className={getSelectedPageClass(false)}
        >
          Home
        </Link>
        <Link
          to={ROUTES.ACCOUNT}
          className={getSelectedPageClass(false)}
        >
          Account
        </Link>
        <Link
          to={ROUTES.ADMIN}
          className={getSelectedPageClass(false)}
        >
          Admin
        </Link>
      </div>
    </div>
  );

  const renderSideLinks = (
    <div className="hidden md:block">
      <div className="ml-4 flex items-center md:ml-6">
        <Link
          to={ROUTES.SIGN_IN}
          className="bg-purple-600 text-white px-3 py-2 rounded-md text-sm font-medium"
        >
          Sign In
        </Link>
      </div>
    </div>
  );

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img
                className="h-8 w-8"
                src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                alt="Workflow"
              />
            </div>
            {renderLinks}
          </div>

          {renderSideLinks}

        </div>
      </div>
    </nav>
  );
};

export default Navigation;
