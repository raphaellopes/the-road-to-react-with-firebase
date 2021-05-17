import React from 'react';

const AdminUserList = ({ users }) => {

  const renderHeader = () => {
    const colClass = 'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
    return (
      <thead className="bg-gray-50">
        <tr>
          <th
            scope="col"
            className={colClass}
          >
            Name
          </th>
          <th
            scope="col"
            className={colClass}
          >
            Roles
          </th>
        </tr>
      </thead>
    );
  }

  const renderBody = () => {
    return (
      <tbody className="bg-white divide-y divide-gray-200">
        {users.map(user => (
          <tr key={user.uid}>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="flex items-center">
                <div className="flex-shrink-0 h-10 w-10">
                  <img className="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60" alt="" />
                </div>
                <div className="ml-4">
                  <div className="text-sm font-medium text-gray-900">
                    {user.username}
                  </div>
                  <div className="text-sm text-gray-500">
                    {user.email}
                  </div>
                </div>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              {renderHeader()}
              {renderBody()}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUserList;