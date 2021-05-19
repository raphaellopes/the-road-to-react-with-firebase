import React, { useState, useEffect } from 'react';

import { withFirebase } from '../../Firebase';
import { SIGN_IN_METHODS } from '../constants';
import { FormErrorBox } from '../../shared';
import DefaultLoginToggle from './defaultLoginToggle';
import SocialLoginToggle from './socialLoginToggle';

const LoginManagement = ({ firebase, authUser }) => {
  const [activeSignInMethods, setActiveSignInMethods] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState('');

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
      })
      .finally(() => {
        setLoading('');
      });
  }

  const onDefaultLoginLink = password => {
    const credential = firebase.emailAuthProvider.credential(
      authUser.email,
      password
    );

    firebase.auth.currentUser
      .linkAndRetrieveDataWithCredential(credential)
      .then(fetchSignMethods)
      .catch(firebaseError => {
        setError(firebaseError);
      })
      .finally(() => {
        setLoading('');
      });
  }

  const onSocialLoginLink = provider => {
    firebase.auth.currentUser
      .linkWithPopup(firebase[provider])
      .then(fetchSignMethods)
      .catch(firebaseError => {
        setError(firebaseError);
      })
      .finally(() => {
        setLoading('');
      });
  }

  const onUnlink = providerId => {
    setLoading(providerId);
    firebase.auth.currentUser
      .unlink(providerId)
      .then(fetchSignMethods)
      .catch(firebaseError => {
        setError(firebaseError);
      })
      .finally(() => {
        setLoading('');
      });
  }

  const renderError = error && (
    <FormErrorBox>
      {error.message}
    </FormErrorBox>
  );

  const renderItem = ({ id, provider }) => {
    const  onlyOneLeft = activeSignInMethods.length === 1;
    const isEnabled = activeSignInMethods.includes(id);
    return (
      <li
        key={id}
        className="pl-3 pr-4 py-3 flex items-center justify-between text-sm hover:bg-gray-200"
      >
        {id === 'password'
          ? (
            <DefaultLoginToggle
              onlyOneLeft={onlyOneLeft}
              isEnabled={isEnabled}
              signInMethod={{ id, provider }}
              onLink={value => {
                onDefaultLoginLink(value);
                setLoading(id);
              }}
              onUnlink={onUnlink}
              loading={loading === id}
            />
          )
          : (
            <SocialLoginToggle
              onlyOneLeft={onlyOneLeft}
              isEnabled={isEnabled}
              signInMethod={{ id, provider }}
              onLink={password => {
                onSocialLoginLink(password);
                setLoading(id);
              }}
              onUnlink={onUnlink}
              loading={loading === id}
            />
          )
        }
      </li>
    );
  };

  return (
    <div>
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Sign In Methods:
      </h2>
      {renderError}
      <ul className="mt-4 border border-gray-200 rounded-md divide-y divide-gray-200">
        {SIGN_IN_METHODS.map(renderItem)}
      </ul>
    </div>
  );
};

export default withFirebase(LoginManagement);
