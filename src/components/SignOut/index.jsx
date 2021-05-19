import React from 'react';

import { withFirebase } from '../Firebase';
import { Button } from '../shared';

const SignOutButton = ({ firebase }) => {
  const handleClick = () => {
    localStorage.removeItem('authUser');
    firebase.signOut();
  };

  return (
    <Button
      onClick={handleClick}
    >
      Sign Out
    </Button>
  );
}

export default withFirebase(SignOutButton);
