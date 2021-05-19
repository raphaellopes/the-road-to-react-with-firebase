import React, { useState } from 'react';

import { Button, Input } from '../../shared';

const DefaultLoginLink = ({
  isEnabled, onlyOneLeft, onUnlink, onLink, signInMethod, loading
}) => {
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const isInvalid = password !== passwordConfirm || password === '';

  const handleSubmit = event => {
    event.preventDefault();
    onLink(password);
    setPassword('');
    setPasswordConfirm('');
  }

  // renders
  const renderEnabled = (
    <Button
      onClick={() => onUnlink(signInMethod.id)}
      disabled={onlyOneLeft}
    >
      Deactivate {signInMethod.id}
    </Button>
  );

  const renderSubmitButton = (
    <div>
      <Button
        type="submit"
        disabled={isInvalid}
        className={isInvalid ? 'disabled:opacity-50' : ''}
      >
        Link {signInMethod.id}
      </Button>
    </div>
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
      name="passwordConfirm"
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

  const renderDeactivate = (
    <form
      className="space-y-6 w-full"
      onSubmit={handleSubmit}
      method="POST"
    >
      {renderFields}
      {renderSubmitButton}
    </form>
  );

  const renderLoading = (
    <p className="text-center text-gray-900 w-full">Loading...</p>
  );

  return loading ? renderLoading : isEnabled ? renderEnabled : renderDeactivate;
}

export default DefaultLoginLink;
