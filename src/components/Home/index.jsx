import React from 'react';

import { withAuthorization } from '../Session';

const Home = () => (
  <h1>Home</h1>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Home);
