import React, { useContext } from 'react';
import { compose } from 'recompose';

import { withAuthorization, AuthUserContext, withEmailVerification } from '../Session';
import { PasswordForgetForm } from '../PasswordForget';
import { PasswordChangeForm } from '../PasswordChange';
import { HeaderContainer } from '../shared';
import LoginManagement from './components/loginManagement';

// @TODO: Improve layout
const Account = () => {
  const authUser = useContext(AuthUserContext);

  const renderHeader = (
    <HeaderContainer>
      Account: {authUser.email}
    </HeaderContainer>
  );

  return (
    <>
      {renderHeader}
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <PasswordForgetForm />
          <PasswordChangeForm />
          <LoginManagement authUser={authUser} />
        </div>
      </div>
    </>
  );
}

const condition = authUser => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition)
)(Account);
