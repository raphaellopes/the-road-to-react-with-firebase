import React from 'react';

import { Container, Content, HeaderContainer } from '../shared';
import PasswordForgetForm from './components/form';
import PasswordForgetLink from './components/link';

const PasswordForget = () => (
  <>
    <HeaderContainer>
      Password Forget
    </HeaderContainer>
    <Container>
      <Content>
        <PasswordForgetForm />
      </Content>
    </Container>
  </>
);

export default PasswordForget;
export { PasswordForgetForm, PasswordForgetLink };
