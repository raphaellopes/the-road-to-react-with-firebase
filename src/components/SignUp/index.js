import React from 'react';

import { Container, Content, HeaderContainer } from '../shared';
import SignUpForm from './components/form';
import SignUpLink from './components/link';

const SignUp = () => {
  return (
    <>
      <HeaderContainer>
        Sign Up
      </HeaderContainer>
      <Container>
        <Content>
          <SignUpForm />
        </Content>
      </Container>
    </>
  );
}

export default SignUp;
export { SignUpForm, SignUpLink };
