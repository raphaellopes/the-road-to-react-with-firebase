import React, { useContext } from 'react';

import { withAuthorization, AuthUserContext } from '../Session';
import { PasswordForgetForm } from '../PasswordForget';
import { PasswordChangeForm } from '../PasswordChange';

// @TODO: Improve layout
const Account = () => {
  const authUser = useContext(AuthUserContext);

  return (
    <>
      <h1>Account: {authUser.email}</h1>
      <PasswordForgetForm />
      <PasswordChangeForm />
    </>
  );
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Account);
