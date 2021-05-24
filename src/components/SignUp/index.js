import React from 'react';

import { Container } from '../shared';
import SignUpForm from './components/form';
import SignUpLink from './components/link';

const SignUp = () => {
  return (
    <Container>
      <SignUpForm />
    </Container>
  );
}

export default SignUp;
export { SignUpForm, SignUpLink };
