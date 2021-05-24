import React from 'react';

import { Container } from '../shared';
import SignInForm from './components/form';
import SignInGoogle from './components/signInGoogle';
import SignInFacebook from './components/signInFacebook';
import SignInTwitter from './components/signInTwitter';

const SignIn = () => (
  <Container>
    <SignInForm />
    <SignInGoogle />
    <SignInFacebook />
    <SignInTwitter />
  </Container>
);

export default SignIn;
export { SignInForm, SignInGoogle };
