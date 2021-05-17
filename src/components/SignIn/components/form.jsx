import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import * as ROUTES from '../../../constants/routes';
import { Input, FormErrorBox, Button } from '../../shared';
import { SignUpLink } from '../../SignUp';
import { withFirebase } from '../../Firebase';

const SignInForm = ({ firebase, history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const isInvalid = email === '' || password === '';

  const clearState = () => {
    setEmail('');
    setPassword('');
    setError(null);
  }

  const handleSubmit = event => {
    event.preventDefault();

    firebase
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        clearState();
        history.push(ROUTES.HOME);
      })
      .catch(firebaseError => {
        setError(firebaseError);
      })
  }

  // renders
  const renderHeader = (
    <div>
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Sign in
      </h2>
    </div>
  );

  const renderError = error && (
    <FormErrorBox>
      {error.message}
    </FormErrorBox>
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

  const renderEmailField = (
    <Input
      label="Email"
      id="email"
      name="email"
      value={email}
      onChange={e => setEmail(e.target.value)}
      className="rounded-t-md"
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
      className="rounded-b-md"
      type="password"
      required
    />
  );

  const renderFields = (
    <div className="rounded-md shadow-sm -space-y-px">
      {renderEmailField}
      {renderPasswordField}
    </div>
  );

  const renderForm = (
    <form
      className="mt-8 space-y-6"
      onSubmit={handleSubmit}
      method="POST"
    >
      {renderFields}
      {renderSubmitButton}
    </form>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {renderHeader}
        {renderError}
        {renderForm}
        <SignUpLink />
      </div>
    </div>
  );
};

export default compose(
  withRouter,
  withFirebase
)(SignInForm);
