import React from 'react';

import { PasswordForgetForm } from '../PasswordForget';
import { PasswordChangeForm } from '../PasswordChange';

// @TODO: Improve layout
const Account = () => (
  <>
    <h1>Account</h1>
    <PasswordForgetForm />
    <PasswordChangeForm />
  </>
);

export default Account;
