import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../../constants/routes';

const PasswordForgetLink = () => (
  <p className="mt-2 text-center text-sm text-gray-600">
    <Link
      to={ROUTES.PASSWORD_FORGET}
      className="font-medium text-purple-600 hover:text-purple-500"
    >
      Forgot Password?
    </Link>
  </p>
);

export default PasswordForgetLink;
