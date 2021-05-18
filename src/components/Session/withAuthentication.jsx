import React, { useState, useEffect } from 'react';

import AuthUserContext from './context';
import { withFirebase } from '../Firebase';

const withAuthentication = Component => {
  const WithAuthentication = ({ firebase, ...props }) => {
    const [authUser, setAuthUser] = useState(
      JSON.parse(localStorage.getItem('authUser'))
    );

    useEffect(() => {
      const subscribe = firebase.onAuthUserListener(
        user => {
          localStorage.setItem(
            'authUser',
            JSON.stringify(user)
          );
          setAuthUser(user);
        },
        () => setAuthUser(null)
      );

      return function cleanUp() {
        localStorage.removeItem('authUser');
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
