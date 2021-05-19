import React, { useState } from 'react';

import { withFirebase } from '../../Firebase';
import { Button, FormErrorBox, Input } from '../../shared';

const PasswordChangeForm = ({ firebase }) => {
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState(null);

  const isInvalid = password !== passwordConfirm ||password === '';

  const clearState = () => {
    setPassword('');
    setPasswordConfirm('');
    setError(null);
  }

  const handleSubmit = event => {
    event.preventDefault();

    firebase
      .passwordUpdate(password)
      .then(() => {
        clearState();
        // history.push(ROUTES.HOME);
      })
      .catch(firebaseError => {
        setError(firebaseError);
      });
  }

  // renders
  const renderHeader = (
    <div>
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Change Password
      </h2>
    </div>
  );

  const renderError = error && (
    <FormErrorBox>
      {error.message}
    </FormErrorBox>
  );

  const renderPasswordField = (
    <Input
      label="Password"
      id="password"
      name="password"
      value={password}
      onChange={e => setPassword(e.target.value)}
      className="rounded-t-md"
      type="password"
      required
    />
  );

  const renderPasswordConfirmField = (
    <Input
      label="Confirm Password"
      id="password-confirm"
      name="password-confirm"
      value={passwordConfirm}
      onChange={e => setPasswordConfirm(e.target.value)}
      className="rounded-b-md"
      type="password"
      required
    />
  );

  const renderFields = (
    <div className="rounded-md shadow-sm -space-y-px">
      {renderPasswordField}
      {renderPasswordConfirmField}
    </div>
  );

  const renderSubmitButton = (
    <div>
      <Button
        type="submit"
        disabled={isInvalid}
        className={isInvalid ? 'disabled:opacity-50' : ''}
      >
        Reset my password
      </Button>
    </div>
  );

  return (
    <form
      className="mt-8 space-y-6"
      onSubmit={handleSubmit}
      method="POST"
    >
      {renderHeader}
      {renderError}
      {renderFields}
      {renderSubmitButton}
    </form>
  );
}

export default withFirebase(PasswordChangeForm);
