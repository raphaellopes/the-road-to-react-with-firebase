import React from 'react';

const UserDetail = ({ match }) => (
  <h1>User detail page {match.params.id}</h1>
);

export default UserDetail;
