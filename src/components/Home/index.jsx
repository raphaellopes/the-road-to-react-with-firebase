import React from 'react';
import { compose } from 'recompose';

import { withAuthorization, withEmailVerification } from '../Session';
import { Container, HeaderContainer } from '../shared';
import Messages from './components/messages';

const Home = () => (
  <>
    <HeaderContainer>
      Home
    </HeaderContainer>
    <Container>
      <Messages />
    </Container>
  </>
);

const condition = authUser => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition)
)(Home);
