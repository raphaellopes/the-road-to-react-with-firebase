import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../../Firebase';
import * as ROUTES from '../../../constants/routes';
import { FormErrorBox, Button } from '../../shared';
import * as LOCAL_CONST from './constants';


const SignInFacebook = ({ firebase, history }) => {
  const [error, setError] = useState(null);

  const handleSubmit = event => {
    event.preventDefault();

    firebase
      .signInWithFacebook()
      .then(socialAuthUser => {
        return firebase.user(socialAuthUser.user.uid)
          .set({
            username: socialAuthUser.additionalUserInfo.profile.name,
            email: socialAuthUser.additionalUserInfo.profile.email,
            roles: {}
          });
      })
      .then(() => {
        setError(null);
        history.push(ROUTES.HOME);
      })
      .catch(firebaseError => {
        if (firebaseError.code === LOCAL_CONST.ERROR_CODE_ACCOUNT_EXISTS) {
          firebaseError.message = LOCAL_CONST.ERROR_MSG_ACCOUNT_EXIXTS;
        }
        setError(firebaseError);
      });
  }

  const renderError = error && (
    <FormErrorBox>
      {error.message}
    </FormErrorBox>
  );

  const renderSubmitButton = (
    <div>
      <Button
        type="submit"
      >
        Sign In with Facebook
      </Button>
    </div>
  );

  return (
    <form
      className="mt-8 space-y-6"
      onSubmit={handleSubmit}
      method="POST"
    >
      {renderError}
      {renderSubmitButton}
    </form>
  );
}

export default compose(
  withRouter,
  withFirebase
)(SignInFacebook);
