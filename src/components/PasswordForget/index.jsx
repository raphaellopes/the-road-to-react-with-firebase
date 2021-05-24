import React from 'react';

import { Container } from '../shared';
import PasswordForgetForm from './components/form';
import PasswordForgetLink from './components/link';

const PasswordForget = () => (
  <Container>
    <PasswordForgetForm />
  </Container>
);

export default PasswordForget;
export { PasswordForgetForm, PasswordForgetLink };
