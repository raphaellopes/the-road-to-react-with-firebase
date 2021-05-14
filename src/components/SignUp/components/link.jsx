import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../../constants/routes';

const SignUpLink = () => (
  <p className="mt-2 text-center text-sm text-gray-600">
    Don't have an account?
    <Link
      to={ROUTES.SIGN_UP}
      className="font-medium text-purple-600 hover:text-purple-500"
    >
      Sign up
    </Link>
  </p>
);

export default SignUpLink;
