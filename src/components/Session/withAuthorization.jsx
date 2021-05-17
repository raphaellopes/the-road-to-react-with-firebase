import React, { useEffect, useContext } from 'react';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import AuthUserContext from './context';

const withAuthorization = condition => Component => {
  const WithAuthentication = ({ firebase, history, ...props }) => {
    const authUser = useContext(AuthUserContext);

    useEffect(() => {
      const listener = firebase.auth.onAuthStateChanged(
        authUser => {
          if (!condition(authUser)) {
            history.push(ROUTES.SIGN_IN);
          }
        }
      );

      return function cleanUp() {
        listener();
      }
    }, []);

    return condition(authUser)
      ? (
        <Component {...props} />
      )
      : null;
  }
  return compose(
    withRouter,
    withFirebase
  )(WithAuthentication);
}

export default withAuthorization;
