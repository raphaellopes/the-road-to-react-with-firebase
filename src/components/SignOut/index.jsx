import React from 'react';

import { withFirebase } from '../Firebase';
import { Button } from '../shared';

const SignOutButton = ({ firebase }) => (
  <Button
    onClick={firebase.signOut}
  >
    Sign Out
  </Button>
);

export default withFirebase(SignOutButton);
