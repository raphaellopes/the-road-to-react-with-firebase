import React, { useContext } from 'react';
import { compose } from 'recompose';

import { withAuthorization, AuthUserContext, withEmailVerification } from '../Session';
import { PasswordForgetForm } from '../PasswordForget';
import { PasswordChangeForm } from '../PasswordChange';
import { HeaderContainer, Container } from '../shared';
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
      <Container>
        <div className="max-w-md w-full space-y-8 m-auto">
          <PasswordForgetForm />
          <PasswordChangeForm />
          <LoginManagement authUser={authUser} />
        </div>
      </Container>
    </>
  );
}

const condition = authUser => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition)
)(Account);
