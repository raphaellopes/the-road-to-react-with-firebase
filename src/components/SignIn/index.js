import React from 'react';

import SignInForm from './components/form';
import SignInGoogle from './components/signInGoogle';
import SignInFacebook from './components/signInFacebook';
import SignInTwitter from './components/signInTwitter';

const SignIn = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-md w-full space-y-8">
      <SignInForm />
      <SignInGoogle />
      <SignInFacebook />
      <SignInTwitter />
    </div>
  </div>
);

export default SignIn;
export { SignInForm, SignInGoogle };
