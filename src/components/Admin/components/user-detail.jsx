import React, { useEffect, useState } from 'react';

import { withFirebase } from '../../Firebase';
import { Button } from '../../shared';

const UserDetail = ({ match, location, firebase }) => {
  const [user, setUser] = useState(location.state.user || null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) return;

    setLoading(true);

    firebase.user(match.params.id)
      .on('value', snapshot => {
        setUser(snapshot.val());
        setLoading(false);
      });

      return function cleanUp() {
        firebase.user(match.params.id).off();
      }
  }, []);

  const handleSendPasswordResetEmail = () => {
    firebase.passwordReset(user.email);
  }

  const formatRoles = roles => roles
    ? Object.keys(roles).map(role => role).join(', ')
    : '-';

  // renders
  const renderActions = (
    <div className="mt-5 flex lg:mt-0 lg:ml-4 ml-6 md:mr-6 mb-5 md:ml-auto md:mb-auto">
      <span className="hidden sm:block">
        <Button onClick={handleSendPasswordResetEmail}>
          Send Password Reset
        </Button>
      </span>
    </div>
  );

  const renderHeader = (
    <div className="md:flex lg:items-center lg:justify-between">
      <div className="px-4 py-5 sm:px-6 flex-1">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          User detail
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Personal details and application.
        </p>
      </div>
      {renderActions}
    </div>
  );

  const renderLine = (label, value, isWhite = false) => (
    <div className={`bg-${isWhite ? 'white' : 'gray-50'} px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}>
      <dt className="text-sm font-medium text-gray-500">
        {label}
      </dt>
      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
        {value}
      </dd>
    </div>
  );

  const renderContent = user && (
    <>
      {renderHeader}
      <div className="border-t border-gray-200">
        <dl>
          {renderLine('ID', user.uid)}
          {renderLine('Username', user.username, true)}
          {renderLine('E-Mail', user.email)}
          {renderLine('Roles', formatRoles(user.roles), true)}
        </dl>
      </div>
    </>
  );

  const renderLoading = (
    <p className="text-center text-gray-900 w-full">Loading...</p>
  );

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      {loading ? renderLoading : renderContent}
    </div>
  );
};

export default withFirebase(UserDetail);
