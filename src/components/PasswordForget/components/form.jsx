import React, { useState } from 'react';

import { withFirebase } from '../../Firebase';
import { Button, FormErrorBox, Input } from '../../shared';

const PasswordForgetForm = ({ firebase }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);

  const isInvalid = email === '';

  const clearState = () => {
    setEmail('');
    setError(null);
  }

  const handleSubmit = event => {
    event.preventDefault();

    firebase
      .passwordReset(email)
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
        Password Forget
      </h2>
    </div>
  );

  const renderError = error && (
    <FormErrorBox>
      {error.message}
    </FormErrorBox>
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

  const renderFields = (
    <div className="rounded-md shadow-sm -space-y-px">
      {renderEmailField}
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

export default withFirebase(PasswordForgetForm);
