import React, { useEffect, useState } from 'react';

import * as ROLES from '../../constants/roles';
import { withAuthorization } from '../Session';
import AdminUserList from './components/user-list';

const Admin = ({ firebase }) => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setLoading(true);

    console.log('>>> admin', firebase);

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

  console.log('>>> admin', { users });

  const renderHeader = (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Admin
        </h1>
      </div>
    </header>
  );

  return (
    <>
      {renderHeader}
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            {loading && <div>Loading ...</div>}
            {!loading && <AdminUserList users={users} />}
          </div>
        </div>
      </main>
    </>
  );
};

const condition = authUser => {
  console.log('condition >>>', { authUser });
  return authUser && !!authUser.roles[ROLES.ADMIN];
  // return !!authUser;
}

export default withAuthorization(condition)(Admin);
