import React, { useState, useEffect } from 'react';

import { withFirebase } from '../../Firebase';
import { Button } from '../../shared';
import { SIGN_IN_METHODS } from '../constants';

const LoginManagement = ({ firebase, authUser }) => {
  const [activeSignInMethods, setActiveSignInMethods] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSignMethods();
  }, []);

  const fetchSignMethods = () => {
    firebase.auth
      .fetchSignInMethodsForEmail(authUser.email)
      .then(firebaseSignInMethods => {
        setActiveSignInMethods(firebaseSignInMethods);
        setError(null);
      })
      .catch(firebaseError => {
        setError(firebaseError);
      });
  }

  const onSocialLoginLink = provider => {
    firebase.auth.currentUser
      .linkWithPopup(firebase[provider])
      .then(fetchSignMethods)
      .catch(firebaseError => {
        setError(firebaseError);
      });
  }

  const onUnlink = providerId => {
    firebase.auth.currentUser
      .unlink(providerId)
      .then(fetchSignMethods)
      .catch(firebaseError => {
        setError(firebaseError);
      });
  }

  const renderItem = ({ id, provider }) => {
    const  onlyOneLeft = activeSignInMethods.length === 1;
    const isEnabled = activeSignInMethods.includes(id);
    return (
      <li
        key={id}
        className="pl-3 pr-4 py-3 flex items-center justify-between text-sm hover:bg-gray-200"
      >
        <Button
          onClick={() => isEnabled ? onUnlink(id) : onSocialLoginLink(provider)}
          disabled={isEnabled && onlyOneLeft}
        >
          {isEnabled ? 'Deactivate' : 'Link'}{' '}{id}
        </Button>
      </li>
    );
  };

  return (
    <div>
      <p className="text-sm font-medium text-gray-500">
        Sign In Methods:
      </p>
      <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
        {SIGN_IN_METHODS.map(renderItem)}
      </ul>
    </div>
  );
};

export default withFirebase(LoginManagement);
