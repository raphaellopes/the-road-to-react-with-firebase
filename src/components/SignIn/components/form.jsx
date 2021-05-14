import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import * as ROUTES from '../../../constants/routes';
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
    <p className="mt-2 text-center text-sm text-red-600 bg-red-100 border border-red-600 rounded-md p-2">
      {error.message}
    </p>
  );

  const renderSubmitButton = (
    <div>
      <button
        type="submit"
        disabled={isInvalid}
        className={`${isInvalid ? 'disabled:opacity-50' : ''} group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500`}
      >
        <span className="absolute left-0 inset-y-0 flex items-center pl-3">
          <svg
            className="h-5 w-5 text-purple-500 group-hover:text-purple-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true">
            <path
              fillRule="evenodd"
              d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
              clipRule="evenodd"
            />
          </svg>
        </span>
        Sign up
      </button>
    </div>
  );

  const renderEmailField = (
    <div>
      <label htmlFor="email" className="sr-only">
        Email
      </label>
      <input
        id="email"
        name="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        type="email"
        autoComplete="email"
        required
        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
        placeholder="Email"
      />
    </div>
  );

  const renderPasswordField = (
    <div>
      <label htmlFor="password" className="sr-only">
        Password
      </label>
      <input
        id="password"
        name="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        type="password"
        required
        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
        placeholder="Password"
      />
    </div>
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
