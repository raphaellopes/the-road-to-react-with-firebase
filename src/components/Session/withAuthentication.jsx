import React, { useState, useEffect } from 'react';

import AuthUserContext from './context';
import { withFirebase } from '../Firebase';

const withAuthentication = Component => {
  const WithAuthentication = ({ firebase, ...props }) => {
    const [authUser, setAuthUser] = useState(null);

    useEffect(() => {
      const subscribe = firebase.onAuthUserListener(
        user => {
          setAuthUser(user);
        },
        () => setAuthUser(null)
      );

      return function cleanUp() {
        subscribe();
      }
    }, []);

    return (
      <AuthUserContext.Provider value={authUser}>
        <Component {...props} />
      </AuthUserContext.Provider>
    );
  }

  return withFirebase(WithAuthentication);
}

export default withAuthentication;
