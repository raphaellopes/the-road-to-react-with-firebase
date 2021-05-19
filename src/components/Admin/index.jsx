import React, { useEffect, useState } from 'react';
import { compose } from 'recompose';

import * as ROLES from '../../constants/roles';
import { withAuthorization } from '../Session';
import { withFirebase } from '../Firebase';
import { HeaderContainer } from '../shared';
import AdminUserList from './components/user-list';

const Admin = ({ firebase }) => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setLoading(true);

    firebase.users().on('value', snapshot => {
      const usersObject = snapshot.val();
      const usersList = Object.keys(usersObject).map(uid => ({
        ...usersObject[uid],
        uid
      }))
      setUsers(usersList);
      setLoading(false);
    });

    return function cleanUp() {
      firebase.users().off();
    }
  }, [])

  const renderHeader = (
    <HeaderContainer>
      Admin
    </HeaderContainer>
  );

  const renderDescription = (
    <p className="text-sm font-medium text-gray-900">
      The admin Page is accessible by every signed in admin user.
    </p>
  );

  return (
    <>
      {renderHeader}
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            {renderDescription}
            {loading && <div>Loading ...</div>}
            {!loading && <AdminUserList users={users} />}
          </div>
        </div>
      </main>
    </>
  );
};

const condition = authUser => {
  return authUser && !!authUser.roles[ROLES.ADMIN];
}

export default compose(
  withAuthorization(condition),
  withFirebase
)(Admin);
