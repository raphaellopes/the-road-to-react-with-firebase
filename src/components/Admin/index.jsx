import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { compose } from 'recompose';

import * as ROLES from '../../constants/roles';
import * as ROUTES from '../../constants/routes';
import { withAuthorization, withEmailVerification } from '../Session';
import { HeaderContainer, Container } from '../shared';
import AdminUserList from './components/user-list';
import UserDetail from './components/user-detail';

const Admin = () => {
  const renderHeader = (
    <HeaderContainer>
      Admin
    </HeaderContainer>
  );

  const renderDescription = (
    <p className="text-sm font-medium text-gray-900 mb-8">
      The admin Page is accessible by every signed in admin user.
    </p>
  );

  return (
    <>
      {renderHeader}
      <Container>
        {renderDescription}
        <Switch>
          <Route exact path={ROUTES.ADMIN_DETAIL} component={UserDetail} />
          <Route exact path={ROUTES.ADMIN} component={AdminUserList} />
        </Switch>
      </Container>
    </>
  );
};

const condition = authUser => {
  return authUser && !!authUser.roles[ROLES.ADMIN];
}

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(Admin);
