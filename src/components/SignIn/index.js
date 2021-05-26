import React from 'react';

import { Container, Content, HeaderContainer } from '../shared';
import SignInForm from './components/form';
import SignInGoogle from './components/signInGoogle';
import SignInFacebook from './components/signInFacebook';
import SignInTwitter from './components/signInTwitter';

const SignIn = () => (
  <>
    <HeaderContainer>
      Sign In
    </HeaderContainer>
    <Container>
      <Content>
        <SignInForm />
        <SignInGoogle />
        <SignInFacebook />
        <SignInTwitter />
      </Content>
    </Container>
  </>
);

export default SignIn;
export { SignInForm, SignInGoogle };
