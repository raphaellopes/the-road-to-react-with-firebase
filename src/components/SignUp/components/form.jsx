import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import * as ROUTES from '../../../constants/routes';
import * as ROLES from '../../../constants/roles';
import { Input, Checkbox, FormErrorBox, Button } from '../../shared';
import { withFirebase } from '../../Firebase';
import * as LOCAL_CONST from './constants';

const SignUpForm = ({ firebase, history }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState(null);


  const isInvalid =
    password !== passwordConfirm ||
    email === '' ||
    username === '' ||
    password === '';

  const clearState = () => {
    setUsername('');
    setEmail('');
    setPassword('');
    setPasswordConfirm('');
    setError(null);
  }

  const handleSubmit = event => {
    event.preventDefault();

    const roles = {};

    if (isAdmin) {
      roles[ROLES.ADMIN] = ROLES.ADMIN;
    }

    firebase
      .createUserWithEmailAndPassword(email, password)
      .then(authUser => {
        return firebase
          .user(authUser.user.uid)
          .set({
            username,
            email,
            roles,
          })
      })
      .then(() => {
        return firebase.sendEmailVerification();
      })
      .then(() => {
        clearState();
        history.push(ROUTES.HOME);
      })
      .catch(firebaseError => {
        if (firebaseError.code === LOCAL_CONST.ERROR_CODE_ACCOUNT_EXISTS) {
          firebaseError.message = LOCAL_CONST.ERROR_MSG_ACCOUNT_EXIXTS
        }
        setError(firebaseError);
      })
  }

  // renders
  const renderUsernameField = (
    <Input
      label="Full Name"
      id="username"
      name="username"
      value={username}
      onChange={e => setUsername(e.target.value)}
      className="rounded-t-md"
      required
    />
  );

  const renderEmailField = (
    <Input
      label="Email"
      id="email"
      name="email"
      value={email}
      onChange={e => setEmail(e.target.value)}
      type="email"
      autoComplete="email"
      required
    />
  );

  const renderPasswordField = (
    <Input
      label="Password"
      id="password"
      name="password"
      value={password}
      onChange={e => setPassword(e.target.value)}
      type="password"
      required
    />
  );

  const renderPasswordConfirmField = (
    <Input
      label="Confirm Password"
      id="password-confirm"
      name="passwordConfirm"
      value={passwordConfirm}
      onChange={e => setPasswordConfirm(e.target.value)}
      className="mb-6 rounded-b-md"
      type="password"
      required
    />
  );

  const renderOptionAdmin = (
      <Checkbox
        id="admin"
        label="Admin"
        value={isAdmin}
        onChange={e => setIsAdmin(e.target.checked)}
      />
  );

  const renderFields = (
    <div className="rounded-md shadow-sm">
      <div className="mb-2 -space-y-px">
        {renderUsernameField}
        {renderEmailField}
        {renderPasswordField}
        {renderPasswordConfirmField}
      </div>
      {renderOptionAdmin}
    </div>
  );

  const renderSubmitButton = (
    <div>
      <Button
        type="submit"
        disabled={isInvalid}
        className={isInvalid ? 'disabled:opacity-50' : ''}
      >
        Sign up
      </Button>
    </div>
  );

  const renderError = error && (
    <FormErrorBox>
      {error.message}
    </FormErrorBox>
  );

  return (
    <form
      className="mt-8 space-y-6"
      onSubmit={handleSubmit}
      method="POST"
    >
      {renderError}
      {renderFields}
      {renderSubmitButton}
    </form>
  );
};

export default compose(
  withRouter,
  withFirebase
)(SignUpForm);
