import React, { Fragment, useContext } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { Link } from 'react-router-dom';
import { MenuIcon, XIcon } from '@heroicons/react/outline';

import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import { AuthUserContext } from '../Session';
import SignOutButton from '../SignOut';

// @TODO: Refactoring style
const Navigation = () => {
  const authUser = useContext(AuthUserContext);

  const getSelectedPageClass = selected => selected
    ? 'bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium'
    : 'text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium';

  const isAdmin = authUser && !!authUser.roles[ROLES.ADMIN];

  const renderLinksNonAuth = (
    <Link
      to={ROUTES.LANDING}
      className={getSelectedPageClass(true)}
    >
      Landing
    </Link>
  );

  const renderLinksAuth = (
    <>
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
      {isAdmin && (
        <Link
          to={ROUTES.ADMIN}
          className={getSelectedPageClass(false)}
        >
          Admin
        </Link>
      )}
    </>
  );

  const renderSideLinks = (
    <div className="hidden md:block">
      <div className="flex items-center ml-4 md:ml-6">
        {!authUser && (
          <Link
            to={ROUTES.SIGN_IN}
            className="px-3 py-2 text-sm font-medium text-white bg-purple-600 rounded-md"
          >
            Sign In
          </Link>
        )}
        {authUser && <SignOutButton />}
      </div>
    </div>
  );

  const renderLogo = (
    <div className="flex-shrink-0">
      <img
        className="w-8 h-8"
        src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
        alt="Workflow"
      />
    </div>
  );

  const renderMobileMenuButton = (
    <div className="-my-2 -mr-2 md:hidden">
      <Popover.Button className="inline-flex items-center justify-center p-2 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
        <span className="sr-only">Open menu</span>
        <MenuIcon className="w-6 h-6" aria-hidden="true" />
      </Popover.Button>
    </div>
  );

  const renderLinks = (
    <nav className="hidden md:block md:flex-1">
      <div className="flex items-baseline ml-10 space-x-4">
        {authUser ? renderLinksAuth : renderLinksNonAuth}
      </div>
    </nav>
  );

  const renderMobileNav = (open) => (
    <Transition
      show={open}
      as={Fragment}
      enter="duration-200 ease-out"
      enterFrom="opacity-0 scale-95"
      enterTo="opacity-100 scale-100"
      leave="duration-100 ease-in"
      leaveFrom="opacity-100 scale-100"
      leaveTo="opacity-0 scale-95"
    >
      <Popover.Panel
        focus
        static
        className="absolute inset-x-0 top-0 z-10 transition transform origin-top-right md:hidden"
      >
        <div className="bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 divide-y-2 divide-gray-50">
          <div className="px-4 pb-6">
            <div className="flex items-center justify-between h-16">
              {renderLogo}
              <div className="-mr-2">
                <Popover.Button className="inline-flex items-center justify-center p-2 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <span className="sr-only">Close menu</span>
                  <XIcon className="w-6 h-6" aria-hidden="true" />
                </Popover.Button>
              </div>
            </div>
            <div className="mt-6">
              <nav className="flex flex-col items-baseline space-y-4">
                {authUser ? renderLinksAuth : renderLinksNonAuth}
              </nav>
            </div>
          </div>
        </div>
      </Popover.Panel>
    </Transition>
  );

  return (
    <Popover className="fixed inset-x-0 top-0 z-10 bg-gray-800">
      {({ open }) => (
        <>
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {renderLogo}
              {renderMobileMenuButton}
              {renderLinks}
              {renderSideLinks}
            </div>
          </div>
          {renderMobileNav(open)}
        </>
      )}
    </Popover>
  );
};

export default Navigation;
